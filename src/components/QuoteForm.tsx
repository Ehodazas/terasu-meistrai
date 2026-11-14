import { AlertCircle, Check, Info, Loader2 } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'
import {
  emptyQuote,
  MESSAGE_MAX,
  normalizePhone,
  validateAll,
  validateField,
  type QuoteErrors,
  type QuoteValues,
  type TerraceType,
} from '../lib/validation'

/**
 * Užklausos siuntimo adresas. Jei nenurodytas – forma veikia demonstraciniu
 * režimu ir NIEKO NESIUNČIA. Žr. README „Formos prijungimas“.
 */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined
/** Minimalus laikas (ms) nuo formos atvaizdavimo iki pateikimo – paprasta apsauga nuo robotų. */
const MIN_FILL_TIME = 2500

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'demo' | 'too-fast'

const typeOptions: { value: TerraceType; label: string; hint: string }[] = [
  { value: 'medine', label: 'Medinė', hint: 'Pušis, maumedis, termomediena' },
  { value: 'wpc', label: 'WPC', hint: 'Kompozitinės lentos' },
  { value: 'neapsisprendziau', label: 'Dar neapsisprendžiau', hint: 'Patarsime' },
]

const fieldOrder: (keyof QuoteValues)[] = ['name', 'phone', 'email', 'city', 'type', 'area', 'message', 'consent']

export function QuoteForm({ defaultType }: { defaultType?: TerraceType }) {
  const uid = useId()
  const id = (k: string) => `${uid}-${k}`
  const [values, setValues] = useState<QuoteValues>({ ...emptyQuote, type: defaultType ?? '' })
  const [errors, setErrors] = useState<QuoteErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof QuoteValues, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const mountedAt = useRef(0)
  const honeypot = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mountedAt.current = Date.now()
  }, [])

  useEffect(() => {
    if (status !== 'idle' && status !== 'submitting') statusRef.current?.focus()
  }, [status])

  const update = <K extends keyof QuoteValues>(key: K, value: QuoteValues[K]) => {
    const next = { ...values, [key]: value }
    setValues(next)
    if (touched[key] || errors[key]) setErrors((e) => ({ ...e, [key]: validateField(key, next) }))
    if (status === 'demo' || status === 'error' || status === 'too-fast') setStatus('idle')
  }

  const onText = (key: 'name' | 'phone' | 'email' | 'city' | 'area' | 'message') => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => update(key, e.target.value)

  const onBlur = (key: keyof QuoteValues) => () => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors((e) => ({ ...e, [key]: validateField(key, values) }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validateAll(values)
    setErrors(found)
    setTouched(Object.fromEntries(fieldOrder.map((k) => [k, true])))
    const firstInvalid = fieldOrder.find((k) => found[k])
    if (firstInvalid) {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)
      el?.focus()
      return
    }
    // Užpildytas paslėptas laukas – greičiausiai robotas. Nieko nesiunčiame.
    if (honeypot.current?.value) return
    if (Date.now() - mountedAt.current < MIN_FILL_TIME) {
      setStatus('too-fast')
      return
    }
    if (!ENDPOINT) {
      setStatus('demo')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          vardas: values.name.trim(),
          telefonas: normalizePhone(values.phone),
          el_pastas: values.email.trim(),
          miestas: values.city.trim(),
          terasos_tipas: typeOptions.find((o) => o.value === values.type)?.label,
          plotas_m2: values.area.trim(),
          informacija: values.message.trim(),
          _subject: `Nauja užklausa: ${values.name.trim()}, ${values.city.trim()}`,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success')
      setValues({ ...emptyQuote })
      setTouched({})
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  const err = (k: keyof QuoteValues) => (touched[k] ? errors[k] : undefined)
  const describedBy = (k: keyof QuoteValues, extra?: string) =>
    [err(k) ? id(`${k}-err`) : null, extra].filter(Boolean).join(' ') || undefined

  if (status === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-forest/25 bg-white p-8 outline-none sm:p-10">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-paper">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-2xl font-medium">Ačiū, užklausa gauta</h3>
        <p className="mt-3 leading-relaxed text-ink-2">
          Susisieksime su jumis artimiausiomis darbo dienomis, kad aptartume terasą ir suderintume apžiūros laiką.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 min-h-11 font-medium text-forest underline underline-offset-4"
        >
          Pateikti kitą užklausą
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="relative bg-white p-6 sm:p-9" aria-describedby={id('req')}>
      {!ENDPOINT && (
        <div className="mb-7 flex gap-3 border-l-2 border-wood bg-paper-2 px-4 py-3 text-sm leading-relaxed text-ink-2">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-wood-dark" aria-hidden="true" />
          <p>
            <strong className="font-semibold text-ink">Demonstracinė forma.</strong> Užklausos siuntimo paslauga dar
            neprijungta, todėl duomenys niekur nesiunčiami.
          </p>
        </div>
      )}

      <p id={id('req')} className="mb-6 text-sm text-muted">
        Laukai, pažymėti <span className="text-wood-dark">*</span>, yra privalomi.
      </p>

      <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
        <Field label="Vardas" required htmlFor={id('name')} error={err('name')} errorId={id('name-err')}>
          <input
            id={id('name')}
            data-field="name"
            name="name"
            type="text"
            autoComplete="given-name"
            value={values.name}
            onChange={onText('name')}
            onBlur={onBlur('name')}
            aria-invalid={!!err('name')}
            aria-describedby={describedBy('name')}
            aria-required="true"
            className={inputClass(!!err('name'))}
          />
        </Field>

        <Field label="Telefono numeris" required htmlFor={id('phone')} error={err('phone')} errorId={id('phone-err')}>
          <input
            id={id('phone')}
            data-field="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+370 6__ _____"
            value={values.phone}
            onChange={onText('phone')}
            onBlur={onBlur('phone')}
            aria-invalid={!!err('phone')}
            aria-describedby={describedBy('phone')}
            aria-required="true"
            className={inputClass(!!err('phone'))}
          />
        </Field>

        <Field label="El. paštas" htmlFor={id('email')} error={err('email')} errorId={id('email-err')}>
          <input
            id={id('email')}
            data-field="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={onText('email')}
            onBlur={onBlur('email')}
            aria-invalid={!!err('email')}
            aria-describedby={describedBy('email')}
            className={inputClass(!!err('email'))}
          />
        </Field>

        <Field label="Miestas / rajonas" required htmlFor={id('city')} error={err('city')} errorId={id('city-err')}>
          <input
            id={id('city')}
            data-field="city"
            name="city"
            type="text"
            autoComplete="address-level2"
            value={values.city}
            onChange={onText('city')}
            onBlur={onBlur('city')}
            aria-invalid={!!err('city')}
            aria-describedby={describedBy('city')}
            aria-required="true"
            className={inputClass(!!err('city'))}
          />
        </Field>

        <fieldset className="sm:col-span-2" aria-describedby={err('type') ? id('type-err') : undefined}>
          <legend className="mb-2 text-sm font-medium text-ink">
            Terasos tipas <span className="text-wood-dark" aria-hidden="true">*</span>
            <span className="sr-only">(privalomas)</span>
          </legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {typeOptions.map((o, i) => {
              const checked = values.type === o.value
              return (
                <label
                  key={o.value}
                  className={`relative flex min-h-[64px] cursor-pointer flex-col justify-center border px-4 py-3 transition-colors duration-200 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-wood ${
                    checked ? 'border-forest bg-forest/[0.06]' : err('type') ? 'border-error/60' : 'border-line hover:border-ink/40'
                  }`}
                >
                  <input
                    type="radio"
                    name={id('type')}
                    value={o.value}
                    checked={checked}
                    data-field={i === 0 ? 'type' : undefined}
                    onChange={() => {
                      update('type', o.value)
                      setTouched((t) => ({ ...t, type: true }))
                      setErrors((e) => ({ ...e, type: undefined }))
                    }}
                    className="sr-only"
                  />
                  <span className="flex items-center justify-between gap-2 font-medium">
                    {o.label}
                    <span
                      aria-hidden="true"
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        checked ? 'border-forest' : 'border-ink/30'
                      }`}
                    >
                      {checked && <span className="h-2 w-2 rounded-full bg-forest" />}
                    </span>
                  </span>
                  <span className="mt-0.5 text-[0.8125rem] text-muted">{o.hint}</span>
                </label>
              )
            })}
          </div>
          {err('type') && <ErrorText id={id('type-err')}>{err('type')}</ErrorText>}
        </fieldset>

        <Field
          label="Apytikslis terasos plotas (m²)"
          htmlFor={id('area')}
          error={err('area')}
          errorId={id('area-err')}
          className="sm:col-span-2 sm:max-w-[50%] sm:pr-2.5"
        >
          <input
            id={id('area')}
            data-field="area"
            name="area"
            type="text"
            inputMode="decimal"
            placeholder="pvz., 30"
            value={values.area}
            onChange={onText('area')}
            onBlur={onBlur('area')}
            aria-invalid={!!err('area')}
            aria-describedby={describedBy('area')}
            className={inputClass(!!err('area'))}
          />
        </Field>

        <Field
          label="Papildoma informacija"
          htmlFor={id('message')}
          error={err('message')}
          errorId={id('message-err')}
          className="sm:col-span-2"
        >
          <textarea
            id={id('message')}
            data-field="message"
            name="message"
            rows={5}
            maxLength={MESSAGE_MAX}
            placeholder="Pvz., terasos vieta, aukštis nuo žemės, ar reikia laiptų, pageidaujamas laikas."
            value={values.message}
            onChange={onText('message')}
            onBlur={onBlur('message')}
            aria-invalid={!!err('message')}
            aria-describedby={describedBy('message', id('message-count'))}
            className={`${inputClass(!!err('message'))} min-h-[132px] resize-y py-3`}
          />
          <span id={id('message-count')} className="mt-1.5 block text-right text-xs text-muted">
            {values.message.length} / {MESSAGE_MAX}
          </span>
        </Field>

        {/* Apsauga nuo robotų: laukas paslėptas nuo žmonių ir ekrano skaitytuvų */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor={id('company')}>Įmonės svetainė</label>
          <input ref={honeypot} id={id('company')} name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer gap-3 text-[0.9375rem] leading-relaxed text-ink-2">
            <input
              type="checkbox"
              data-field="consent"
              checked={values.consent}
              onChange={(e) => {
                update('consent', e.target.checked)
                setTouched((t) => ({ ...t, consent: true }))
              }}
              aria-invalid={!!err('consent')}
              aria-describedby={err('consent') ? id('consent-err') : undefined}
              aria-required="true"
              className="mt-1 h-[18px] w-[18px] shrink-0 cursor-pointer accent-forest"
            />
            <span>
              Sutinku, kad mano pateikti duomenys būtų naudojami atsakyti į užklausą, kaip aprašyta{' '}
              <Link to="/privatumo-politika" target="_blank" rel="noopener" className="text-ink underline underline-offset-2">
                privatumo politikoje
              </Link>
              . <span className="text-wood-dark" aria-hidden="true">*</span>
            </span>
          </label>
          {err('consent') && <ErrorText id={id('consent-err')}>{err('consent')}</ErrorText>}
        </div>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status === 'demo' && (
          <Notice tone="info" title="Užklausa nebuvo išsiųsta">
            Tai demonstracinė forma – duomenys patikrinti, bet niekur neperduoti. Kol forma neprijungta, susisiekite{' '}
            <a href={site.phoneHref} className="underline underline-offset-2">
              telefonu
            </a>{' '}
            arba{' '}
            <a href={`mailto:${site.email}`} className="underline underline-offset-2">
              el. paštu
            </a>
            .
          </Notice>
        )}
        {status === 'error' && (
          <Notice tone="error" title="Užklausos išsiųsti nepavyko">
            Įvyko ryšio klaida. Jūsų įvesti duomenys išliko – bandykite dar kartą arba skambinkite {site.phone}.
          </Notice>
        )}
        {status === 'too-fast' && (
          <Notice tone="error" title="Forma pateikta per greitai">
            Patikrinkite įvestus duomenis ir po kelių sekundžių bandykite dar kartą.
          </Notice>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-[2px] bg-forest px-7 font-medium text-paper transition-colors duration-300 hover:bg-forest-dark disabled:cursor-wait disabled:opacity-75 sm:w-auto"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Siunčiama…
          </>
        ) : (
          'Pateikti užklausą'
        )}
      </button>
    </form>
  )
}

function inputClass(invalid: boolean) {
  return `block min-h-12 w-full rounded-[2px] border bg-paper/60 px-3.5 text-base text-ink placeholder:text-muted/70 transition-colors duration-200 focus:bg-white focus:outline-2 focus:outline-offset-0 ${
    invalid ? 'border-error focus:outline-error' : 'border-line hover:border-ink/35 focus:border-forest focus:outline-forest'
  }`
}

function Field({
  label,
  required,
  htmlFor,
  error,
  errorId,
  className = '',
  children,
}: {
  label: string
  required?: boolean
  htmlFor: string
  error?: string
  errorId: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required && (
          <>
            {' '}
            <span className="text-wood-dark" aria-hidden="true">
              *
            </span>
            <span className="sr-only">(privalomas)</span>
          </>
        )}
      </label>
      {children}
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  )
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-error">
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  )
}

function Notice({ tone, title, children }: { tone: 'info' | 'error'; title: string; children: ReactNode }) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`mt-7 border-l-2 px-4 py-3.5 text-sm leading-relaxed ${
        tone === 'error' ? 'border-error bg-error/[0.06] text-ink' : 'border-wood bg-paper-2 text-ink'
      }`}
    >
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-ink-2">{children}</p>
    </div>
  )
}

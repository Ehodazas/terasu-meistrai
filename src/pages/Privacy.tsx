import type { ReactNode } from 'react'
import { Seo } from '../components/Seo'
import { seo } from '../data/seo'
import { site } from '../data/site'

/**
 * PRIVATUMO POLITIKA – ŠABLONAS.
 * Prieš paleidžiant svetainę įrašykite tikrus įmonės rekvizitus, pasirinktą
 * formos paslaugų teikėją ir, jei reikia, pasikonsultuokite su teisininku.
 */
export default function Privacy() {
  return (
    <section className="pt-[var(--header-h)]">
      <Seo entry={seo.privacy} />
      <div className="wrap py-14 sm:py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow">Teisinė informacija</p>
            <h1 className="h-display mt-5 text-[2.4rem] sm:text-[3.2rem]">Privatumo politika</h1>
            <p className="mt-6 border-l-2 border-wood bg-paper-2 px-4 py-3 text-sm leading-relaxed text-ink-2">
              Šablonas. Prieš paleidžiant svetainę įrašykite tikrus duomenų valdytojo rekvizitus ir patikrinkite tekstą
              pagal faktinį duomenų tvarkymą.
            </p>
          </div>

          <div className="max-w-2xl space-y-10 text-[1.0625rem] leading-[1.8] text-ink-2 lg:col-span-7 lg:col-start-6">
            <Block title="1. Duomenų valdytojas">
              <p>
                Asmens duomenų valdytojas – {site.name} [įmonės teisinė forma, pavadinimas, įmonės kodas, buveinės adresas].
                Kontaktai duomenų apsaugos klausimais: {site.email}, {site.phone}.
              </p>
            </Block>
            <Block title="2. Kokius duomenis renkame">
              <p>Per užklausos formą galite pateikti: vardą, telefono numerį, el. pašto adresą, miestą ar rajoną, informaciją apie planuojamą terasą (tipą, apytikslį plotą) ir laisvos formos žinutę.</p>
              <p>Nerenkame daugiau duomenų, nei reikia atsakyti į užklausą. Prašome žinutėje nenurodyti jautrios informacijos.</p>
            </Block>
            <Block title="3. Tikslas ir teisinis pagrindas">
              <p>
                Duomenis tvarkome tam, kad galėtume atsakyti į jūsų užklausą, suderinti apžiūrą ir parengti pasiūlymą.
                Teisinis pagrindas – veiksmai jūsų prašymu prieš sudarant sutartį (BDAR 6 str. 1 d. b p.) ir jūsų sutikimas
                (BDAR 6 str. 1 d. a p.).
              </p>
            </Block>
            <Block title="4. Saugojimo terminas">
              <p>
                Užklausų duomenis saugome ne ilgiau kaip [12 mėnesių] nuo paskutinio bendravimo, jei nesudaroma sutartis.
                Sudarius sutartį, duomenys saugomi tiek, kiek reikalauja teisės aktai.
              </p>
            </Block>
            <Block title="5. Duomenų gavėjai">
              <p>
                Duomenys neperduodami trečiosioms šalims rinkodaros tikslais. Užklausų pristatymui gali būti naudojamas
                el. pašto ar formų paslaugų teikėjas [paslaugos pavadinimas], veikiantis kaip duomenų tvarkytojas.
              </p>
            </Block>
            <Block title="6. Slapukai ir analitika">
              <p>
                Ši svetainė nenaudoja slapukų, analitikos ar reklamos sekimo įrankių. Šriftai ir nuotraukos įkeliami iš to
                paties serverio kaip ir svetainė. Jei ateityje bus įdiegti neprivalomi slapukai, apie juos informuosime ir
                prašysime sutikimo.
              </p>
            </Block>
            <Block title="7. Jūsų teisės">
              <p>
                Turite teisę susipažinti su savo duomenimis, prašyti juos ištaisyti ar ištrinti, apriboti tvarkymą, atšaukti
                sutikimą ir nesutikti su tvarkymu. Prašymus siųskite {site.email}.
              </p>
              <p>
                Jei manote, kad duomenys tvarkomi netinkamai, galite kreiptis į Valstybinę duomenų apsaugos inspekciją
                (vdai.lrv.lt).
              </p>
            </Block>
            <p className="text-sm text-muted">Paskutinį kartą atnaujinta: [data]</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-medium tracking-[-0.015em] text-ink sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  )
}

import { useState } from "react";
import Icon from "@/components/ui/icon";

const IMAGES = {
  portrait: "https://cdn.poehali.dev/projects/c8970861-38cc-43fa-8c71-e5e30e83b9d0/files/561d8147-6451-4b26-ac12-4d3f58df25f4.jpg",
  stillLife: "https://cdn.poehali.dev/projects/c8970861-38cc-43fa-8c71-e5e30e83b9d0/files/8782fce8-c666-49ad-a373-ec397b5b6b41.jpg",
  gestures: "https://cdn.poehali.dev/projects/c8970861-38cc-43fa-8c71-e5e30e83b9d0/files/4a7a76e2-69e3-425f-93c0-64509f3958fa.jpg",
};

const QUOTES = [
  { text: "Рисование — это искусство видеть. Научись видеть — и ты научишься рисовать.", author: "Микеланджело" },
  { text: "Великий художник — это просто человек, который не оставил попыток.", author: "Поль Сезанн" },
  { text: "В природе нет ничего некрасивого. Некрасивым может быть только взгляд на природу.", author: "Иван Шишкин" },
  { text: "Живопись — это поэзия, которую видят, а не слышат.", author: "Леонардо да Винчи" },
  { text: "Не ищи совершенства — ищи правду. Правда всегда совершенна.", author: "Илья Репин" },
];

const SERVICES = [
  { icon: "Pencil", title: "Рисунок", desc: "Академический рисунок: натюрморт, гипсовая голова, фигура человека. Базовые принципы построения формы и светотени." },
  { icon: "Palette", title: "Живопись", desc: "Работа с цветом, тоном и колоритом. Техники акварели, гуаши и масляной живописи для вступительных испытаний." },
  { icon: "Layers", title: "Композиция", desc: "Законы построения композиции, ритм, пропорции, равновесие. Декоративная и сюжетная композиция." },
  { icon: "Box", title: "Скульптура", desc: "Объёмно-пространственное мышление, работа с пластилином и глиной. Рельеф и круглая скульптура." },
];

const SUCCESSES = [
  { name: "Анна К.", year: "2024", result: "РХУ им. Грекова", score: "98 баллов" },
  { name: "Максим Р.", year: "2024", result: "ХГФ Пед. института", score: "Принят" },
  { name: "Дарья С.", year: "2023", result: "РХУ им. Грекова", score: "95 баллов" },
  { name: "Артём В.", year: "2023", result: "ХГФ Пед. института", score: "Принят" },
  { name: "Елена М.", year: "2022", result: "РХУ им. Грекова", score: "97 баллов" },
  { name: "Никита П.", year: "2022", result: "РХУ им. Грекова", score: "Принят" },
];

const MONTHS = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const AVAILABLE_SLOTS: Record<string, string[]> = {
  "2026-05-11": ["10:00", "14:00", "17:00"],
  "2026-05-12": ["11:00", "15:00"],
  "2026-05-14": ["10:00", "13:00", "16:00"],
  "2026-05-15": ["10:00", "14:00"],
  "2026-05-18": ["11:00", "15:00", "17:00"],
  "2026-05-19": ["10:00", "14:00"],
  "2026-05-21": ["10:00", "13:00", "16:00"],
  "2026-05-22": ["11:00", "15:00"],
  "2026-05-26": ["10:00", "14:00", "17:00"],
  "2026-05-28": ["10:00", "13:00"],
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function Index() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(4);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", comment: "" });
  const [formSent, setFormSent] = useState(false);

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const today = new Date();
  const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  }

  function handleDayClick(day: number) {
    const dateStr = formatDate(calYear, calMonth, day);
    if (!AVAILABLE_SLOTS[dateStr]) return;
    setSelectedDate(dateStr);
    setSelectedTime(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormSent(true);
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-paper font-ibm text-ink overflow-x-hidden">

      {/* Шапка */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-ink/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-cormorant text-xl font-semibold tracking-widest uppercase text-ink">
            Художественная мастерская
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-ibm tracking-wide">
            {[["Услуги", "services"], ["Успехи", "successes"], ["О педагоге", "about"], ["Запись", "calendar"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-graphite hover:text-ochre transition-colors duration-300 uppercase tracking-widest text-xs">
                {label}
              </button>
            ))}
          </nav>
          <button onClick={() => scrollTo("calendar")}
            className="bg-ochre text-paper px-5 py-2 text-xs tracking-widest uppercase font-ibm hover:bg-ochre-dark transition-colors duration-300">
            Записаться
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a1410' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        <div className="absolute right-0 top-16 bottom-0 w-1/2 hidden lg:block overflow-hidden">
          <img src={IMAGES.portrait} alt="Академический рисунок"
            className="w-full h-full object-cover opacity-30 mix-blend-multiply"
            style={{ filter: "sepia(60%) contrast(1.1)" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/50 to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 lg:py-0 lg:w-1/2 lg:mr-auto">
          <div className="animate-fade-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-ochre" />
              <span className="text-ochre text-xs tracking-[0.3em] uppercase font-ibm">Подготовка к поступлению</span>
            </div>
            <h1 className="font-cormorant text-5xl md:text-7xl font-light leading-[1.1] text-ink mb-6">
              Путь<br />
              <span className="italic text-ochre">к призванию</span><br />
              начинается здесь
            </h1>
            <p className="font-ibm text-graphite text-base md:text-lg leading-relaxed mb-10 max-w-md font-light">
              Профессиональная подготовка к вступительным испытаниям в&nbsp;
              <span className="text-ink font-medium">РХУ им.&nbsp;Грекова</span> и&nbsp;
              <span className="text-ink font-medium">ХГФ Пед.&nbsp;института</span>.
              Консультации и подкурсы по рисунку, живописи, композиции и скульптуре.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("calendar")}
                className="bg-ochre text-paper px-8 py-4 text-sm tracking-widest uppercase font-ibm hover:bg-ochre-dark transition-all duration-300 hover:shadow-lg">
                Записаться на консультацию
              </button>
              <button onClick={() => scrollTo("services")}
                className="border border-ink/30 text-ink px-8 py-4 text-sm tracking-widest uppercase font-ibm hover:border-ochre hover:text-ochre transition-all duration-300">
                Узнать об услугах
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-ochre/60" />
        </div>
      </section>

      {/* Цитата */}
      <section className="bg-ink py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={IMAGES.gestures} alt="" className="w-full h-full object-cover" style={{ filter: "sepia(100%)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="text-ochre text-6xl font-cormorant mb-6 leading-none opacity-60">"</div>
          <blockquote className="font-cormorant text-3xl md:text-4xl text-paper font-light italic leading-relaxed mb-8">
            {QUOTES[quoteIdx].text}
          </blockquote>
          <cite className="text-ochre font-ibm text-sm tracking-widest uppercase not-italic block mb-10">
            — {QUOTES[quoteIdx].author}
          </cite>
          <div className="flex justify-center gap-2">
            {QUOTES.map((_, i) => (
              <button key={i} onClick={() => setQuoteIdx(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === quoteIdx ? "bg-ochre w-6" : "w-2 bg-paper/30 hover:bg-paper/60"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Услуги */}
      <section id="services" className="py-24 px-6 bg-paper-dark relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-ochre text-xs tracking-[0.3em] uppercase font-ibm">Дисциплины</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-ink mt-3">Чему я обучаю</h2>
            <div className="h-px w-16 bg-ochre mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-ink/10">
            {SERVICES.map((s, i) => (
              <div key={i} className="p-8 border-r border-b border-ink/10 last:border-r-0 hover:bg-paper transition-colors duration-300 group cursor-default">
                <div className="mb-6 text-ochre group-hover:scale-110 transition-transform duration-300 inline-block">
                  <Icon name={s.icon as "Pencil"} size={32} />
                </div>
                <h3 className="font-cormorant text-2xl font-medium text-ink mb-3">{s.title}</h3>
                <p className="font-ibm text-graphite text-sm leading-relaxed font-light">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-ink p-8 text-paper">
              <div className="font-cormorant text-5xl font-light text-ochre mb-2">01</div>
              <h3 className="font-cormorant text-xl mb-3">Индивидуальная консультация</h3>
              <p className="font-ibm text-paper/70 text-sm leading-relaxed font-light">
                Реальная оценка вашего уровня, разбор работ и конкретный план подготовки. 1,5–2 часа.
              </p>
            </div>
            <div className="bg-paper border border-ink/10 p-8">
              <div className="font-cormorant text-5xl font-light text-ochre mb-2">02</div>
              <h3 className="font-cormorant text-xl text-ink mb-3">Подкурс</h3>
              <p className="font-ibm text-graphite text-sm leading-relaxed font-light">
                Интенсивный курс подготовки к вступительным испытаниям. Малые группы, максимальная отдача.
              </p>
            </div>
            <div className="bg-ochre p-8 text-paper">
              <div className="font-cormorant text-5xl font-light text-paper/50 mb-2">03</div>
              <h3 className="font-cormorant text-xl mb-3">Разбор портфолио</h3>
              <p className="font-ibm text-paper/80 text-sm leading-relaxed font-light">
                Профессиональный анализ ваших работ и рекомендации по улучшению перед поступлением.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Успехи учеников */}
      <section id="successes" className="py-24 px-6 bg-paper relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1/3 hidden lg:block">
          <img src={IMAGES.stillLife} alt="Натюрморт" className="w-full h-full object-cover opacity-20"
            style={{ filter: "sepia(60%)" }} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-paper" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="lg:ml-auto lg:w-2/3">
            <div className="mb-16">
              <span className="text-ochre text-xs tracking-[0.3em] uppercase font-ibm">Результаты</span>
              <h2 className="font-cormorant text-4xl md:text-5xl font-light text-ink mt-3">
                Мои ученики<br /><span className="italic">в лучших вузах</span>
              </h2>
              <div className="h-px w-16 bg-ochre mt-6" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SUCCESSES.map((s, i) => (
                <div key={i} className="flex items-start gap-4 p-5 border border-ink/10 hover:border-ochre/40 transition-colors duration-300 bg-paper-dark/30">
                  <div className="text-ochre font-cormorant text-3xl font-light leading-none mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="font-cormorant text-xl text-ink font-medium">{s.name}</div>
                    <div className="font-ibm text-xs text-ochre tracking-wide uppercase mt-0.5">{s.result}</div>
                    <div className="font-ibm text-sm text-graphite mt-1 font-light">{s.score} · {s.year}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 p-6 border-l-4 border-ochre bg-ink/5">
              <p className="font-cormorant text-xl text-graphite italic leading-relaxed">
                "Мои ученики поступают в РХУ им. Грекова и ХГФ уже более 15 лет.
                Каждый из них начинал с нуля — и находил свой путь в искусстве."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* О педагоге */}
      <section id="about" className="py-24 px-6 bg-ink text-paper relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px)`
          }} />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-ochre text-xs tracking-[0.3em] uppercase font-ibm">Педагог</span>
              <h2 className="font-cormorant text-4xl md:text-5xl font-light text-paper mt-3 mb-8">
                Опыт. Традиция.<br /><span className="italic text-ochre">Результат.</span>
              </h2>
              <div className="space-y-5 font-ibm text-paper/80 font-light leading-relaxed">
                <p>Преподаватель рисунка и живописи с многолетним опытом подготовки абитуриентов к поступлению в ведущие художественные учебные заведения.</p>
                <p>Работаю с РХУ им. М.&nbsp;Б.&nbsp;Грекова и Художественно-графическим факультетом Педагогического института — знаю требования программы изнутри.</p>
                <p>Обучаю рисунку, живописи, композиции и скульптуре. Мой подход: дать реальную оценку уровня и конкретный путь к цели.</p>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6">
                {[["15+", "лет опыта"], ["100+", "выпускников"], ["95%", "поступают"]].map(([num, label], i) => (
                  <div key={i} className="text-center border border-paper/10 p-4">
                    <div className="font-cormorant text-4xl font-light text-ochre">{num}</div>
                    <div className="font-ibm text-xs text-paper/50 uppercase tracking-widest mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-cormorant text-2xl text-ochre italic mb-6">Чем я отличаюсь</h3>
              <div className="space-y-0">
                {[
                  "Знаю требования РХУ и ХГФ изнутри — работаю в системе",
                  "Честная оценка: не хвалю, а помогаю расти",
                  "Малые группы или индивидуально — никаких потоков",
                  "Программа под каждого: с нуля до результата",
                  "Готовлю к конкретным испытаниям, а не вообще «рисовать»",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4 py-4 border-b border-paper/10">
                    <div className="text-ochre mt-0.5 shrink-0"><Icon name="Check" size={16} /></div>
                    <p className="font-ibm text-sm text-paper/80 leading-relaxed font-light">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Слова мастеров */}
      <section className="py-20 px-6 bg-paper-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-ochre text-xs tracking-[0.3em] uppercase font-ibm">Вдохновение</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-ink mt-3">Слова мастеров</h2>
            <div className="h-px w-16 bg-ochre mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10">
            {QUOTES.map((q, i) => (
              <div key={i} className="bg-paper p-8">
                <div className="text-ochre/40 font-cormorant text-5xl leading-none mb-4">"</div>
                <p className="font-cormorant text-lg italic text-graphite leading-relaxed mb-6">{q.text}</p>
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-ink/10" />
                  <span className="font-ibm text-xs tracking-widest text-ochre uppercase">{q.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Календарь записи */}
      <section id="calendar" className="py-24 px-6 bg-paper relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-ochre text-xs tracking-[0.3em] uppercase font-ibm">Запись</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-ink mt-3">Выберите удобное время</h2>
            <div className="h-px w-16 bg-ochre mx-auto mt-6" />
            <p className="font-ibm text-graphite text-sm mt-6 font-light">
              Выберите дату и время — свяжусь с вами для подтверждения
            </p>
          </div>

          {!formSent ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Календарь */}
              <div className="border border-ink/10 bg-paper-dark/30 p-6">
                <div className="flex items-center justify-between mb-6">
                  <button onClick={prevMonth} className="text-graphite hover:text-ochre transition-colors p-1">
                    <Icon name="ChevronLeft" size={20} />
                  </button>
                  <h3 className="font-cormorant text-xl text-ink font-medium">
                    {MONTHS[calMonth]} {calYear}
                  </h3>
                  <button onClick={nextMonth} className="text-graphite hover:text-ochre transition-colors p-1">
                    <Icon name="ChevronRight" size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-3">
                  {DAYS.map(d => (
                    <div key={d} className="text-center text-xs font-ibm text-graphite/60 uppercase tracking-wider py-1">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }, (_, i) => <div key={`e-${i}`} />)}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const dateStr = formatDate(calYear, calMonth, day);
                    const hasSlots = !!AVAILABLE_SLOTS[dateStr];
                    const isSelected = selectedDate === dateStr;
                    const isToday = dateStr === todayStr;
                    const isPast = dateStr < todayStr;
                    return (
                      <button key={day} onClick={() => handleDayClick(day)} disabled={!hasSlots || isPast}
                        className={`
                          relative aspect-square flex items-center justify-center text-sm font-ibm rounded-sm transition-all duration-200
                          ${isPast ? "text-ink/20 cursor-not-allowed" : ""}
                          ${!hasSlots && !isPast ? "text-ink/40 cursor-not-allowed" : ""}
                          ${hasSlots && !isPast && !isSelected ? "text-ink hover:bg-ochre/10 hover:text-ochre font-medium cursor-pointer" : ""}
                          ${isSelected ? "bg-ochre text-paper font-medium" : ""}
                          ${isToday && !isSelected ? "border border-ochre text-ochre" : ""}
                        `}>
                        {day}
                        {hasSlots && !isPast && !isSelected && (
                          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-ochre/60" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center gap-6 text-xs font-ibm text-graphite/60">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-ochre/60" />
                    <span>Есть запись</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border border-ochre rounded-sm" />
                    <span>Сегодня</span>
                  </div>
                </div>

                {selectedDate && AVAILABLE_SLOTS[selectedDate] && (
                  <div className="mt-6 pt-6 border-t border-ink/10">
                    <p className="font-ibm text-xs text-graphite uppercase tracking-widest mb-3">Выберите время:</p>
                    <div className="flex flex-wrap gap-2">
                      {AVAILABLE_SLOTS[selectedDate].map(time => (
                        <button key={time} onClick={() => setSelectedTime(time)}
                          className={`px-4 py-2 text-sm font-ibm border transition-all duration-200
                            ${selectedTime === time
                              ? "bg-ochre text-paper border-ochre"
                              : "border-ink/20 text-ink hover:border-ochre hover:text-ochre"}`}>
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Форма */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {selectedDate && selectedTime && (
                  <div className="bg-ochre/10 border border-ochre/30 p-4 font-ibm text-sm text-ink flex items-center gap-2">
                    <Icon name="Calendar" size={14} className="text-ochre shrink-0" />
                    <span>Запись: <strong className="text-ochre">
                      {new Date(selectedDate + "T12:00:00").toLocaleDateString("ru-RU", { day: "numeric", month: "long" })} в {selectedTime}
                    </strong></span>
                  </div>
                )}
                <div>
                  <label className="font-ibm text-xs tracking-widest uppercase text-graphite block mb-2">Ваше имя *</label>
                  <input required value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    className="w-full border border-ink/20 bg-paper-dark/30 px-4 py-3 font-ibm text-sm text-ink focus:outline-none focus:border-ochre transition-colors"
                    placeholder="Имя абитуриента или родителя" />
                </div>
                <div>
                  <label className="font-ibm text-xs tracking-widest uppercase text-graphite block mb-2">Телефон *</label>
                  <input required value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    className="w-full border border-ink/20 bg-paper-dark/30 px-4 py-3 font-ibm text-sm text-ink focus:outline-none focus:border-ochre transition-colors"
                    placeholder="+7 (___) ___-__-__" type="tel" />
                </div>
                <div>
                  <label className="font-ibm text-xs tracking-widest uppercase text-graphite block mb-2">Комментарий</label>
                  <textarea value={formData.comment} onChange={e => setFormData(p => ({ ...p, comment: e.target.value }))}
                    className="w-full border border-ink/20 bg-paper-dark/30 px-4 py-3 font-ibm text-sm text-ink focus:outline-none focus:border-ochre transition-colors resize-none h-24"
                    placeholder="Расскажите о цели — куда поступаете, какой опыт рисования..." />
                </div>
                <button type="submit" disabled={!selectedDate || !selectedTime}
                  className={`w-full py-4 font-ibm text-sm tracking-widest uppercase transition-all duration-300
                    ${selectedDate && selectedTime
                      ? "bg-ochre text-paper hover:bg-ochre-dark cursor-pointer"
                      : "bg-ink/10 text-ink/30 cursor-not-allowed"}`}>
                  {selectedDate && selectedTime ? "Отправить заявку" : "Выберите дату и время"}
                </button>
                <p className="font-ibm text-xs text-graphite/60 text-center">
                  Или напишите напрямую:{" "}
                  <a href="mailto:art.zk@list.ru" className="text-ochre hover:underline">art.zk@list.ru</a>
                </p>
              </form>
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center py-16">
              <div className="text-ochre mb-6 flex justify-center"><Icon name="CheckCircle" size={64} /></div>
              <h3 className="font-cormorant text-3xl text-ink mb-4">Заявка отправлена</h3>
              <p className="font-ibm text-graphite font-light leading-relaxed mb-2">
                Запись на {selectedDate && new Date(selectedDate + "T12:00:00").toLocaleDateString("ru-RU", { day: "numeric", month: "long" })} в {selectedTime}.
              </p>
              <p className="font-ibm text-graphite/70 text-sm font-light">
                Свяжусь с вами в течение дня для подтверждения.
              </p>
              <div className="mt-8 pt-6 border-t border-ink/10">
                <a href="mailto:art.zk@list.ru" className="font-ibm text-sm text-ochre hover:underline tracking-widest uppercase">
                  art.zk@list.ru
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-ink py-16 px-6 text-paper">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="font-cormorant text-2xl font-light mb-4">Художественная<br />мастерская</h3>
              <p className="font-ibm text-paper/60 text-sm font-light leading-relaxed">
                Подготовка к поступлению в РХУ им. Грекова и ХГФ Пед. института.
                Рисунок, живопись, композиция, скульптура.
              </p>
            </div>
            <div>
              <h4 className="font-ibm text-xs tracking-widest uppercase text-ochre mb-6">Учебные заведения</h4>
              <ul className="space-y-3 font-ibm text-sm text-paper/70 font-light">
                <li>РХУ им. М. Б. Грекова</li>
                <li>ХГФ Педагогического института</li>
              </ul>
              <h4 className="font-ibm text-xs tracking-widest uppercase text-ochre mb-4 mt-8">Дисциплины</h4>
              <ul className="space-y-2 font-ibm text-sm text-paper/70 font-light">
                <li>Рисунок · Живопись</li>
                <li>Композиция · Скульптура</li>
              </ul>
            </div>
            <div>
              <h4 className="font-ibm text-xs tracking-widest uppercase text-ochre mb-6">Связаться</h4>
              <div className="space-y-4">
                <a href="mailto:art.zk@list.ru"
                  className="flex items-center gap-3 text-paper/70 hover:text-ochre transition-colors duration-300 font-ibm text-sm font-light">
                  <Icon name="Mail" size={16} className="text-ochre shrink-0" />
                  art.zk@list.ru
                </a>
                <button onClick={() => scrollTo("calendar")}
                  className="flex items-center gap-3 text-paper/70 hover:text-ochre transition-colors duration-300 font-ibm text-sm font-light">
                  <Icon name="CalendarDays" size={16} className="text-ochre shrink-0" />
                  Записаться онлайн
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-paper/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-ibm text-xs text-paper/30 font-light">© 2026 Художественная мастерская. Все права защищены.</p>
            <p className="font-cormorant text-sm italic text-paper/40">
              «Ничего не желать — и идти к своей цели»
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

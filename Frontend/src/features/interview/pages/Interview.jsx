import React, { useState } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useParams } from 'react-router'
import Loader from '../../../components/Loader'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

const loadingClass = "flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-[#0d1117] p-8"
const sectionHeaderClass = "mb-6 flex items-baseline gap-3 border-b border-[#2a3348] pb-4"
const countClass = "rounded-full border border-[#2a3348] bg-[#1c2230] px-2.5 py-1 text-xs text-[#7d8590]"

const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)

    return (
        <div className='overflow-hidden rounded-[0.6rem] border border-[#2a3348] bg-[#1c2230] transition hover:border-[#3a4560]'>
            <div className='flex cursor-pointer select-none items-start gap-3 px-4 py-3.5' onClick={() => setOpen(o => !o)}>
                <span className='mt-0.5 flex-shrink-0 rounded border border-[#ff2d78]/20 bg-[#ff2d78]/10 px-1.5 py-0.5 text-[0.7rem] font-bold text-[#ff2d78]'>Q{index + 1}</span>
                <p className='m-0 flex-1 text-sm font-medium leading-6 text-[#e6edf3]'>{item.question}</p>
                <span className={`mt-0.5 flex-shrink-0 text-[#7d8590] transition ${open ? 'rotate-180 text-[#ff2d78]' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>

            {open && (
                <div className='flex flex-col gap-3 border-t border-[#2a3348] px-4 pb-4 pt-3'>
                    <div className='flex flex-col gap-1.5'>
                        <span className='w-fit rounded border border-violet-400/20 bg-violet-400/10 px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide text-violet-400'>Intention</span>
                        <p className="m-0 text-[0.835rem] leading-6 text-[#a4acb7]">{item.intention}</p>
                    </div>
                    <div className='flex flex-col gap-1.5'>
                        <span className='w-fit rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide text-emerald-500'>Model Answer</span>
                        <p className="m-0 text-[0.835rem] leading-6 text-[#a4acb7]">{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='relative flex flex-col gap-2 py-3 pl-14 before:absolute before:left-[21px] before:top-4 before:h-3.5 before:w-3.5 before:rounded-full before:border-2 before:border-[#ff2d78] before:bg-[#161b22]'>
        <div className='flex items-center gap-2.5'>
            <span className='rounded-full border border-[#ff2d78]/25 bg-[#ff2d78]/10 px-2 py-0.5 text-[0.7rem] font-bold text-[#ff2d78]'>Day {day.day}</span>
            <h3 className='m-0 text-[0.95rem] font-semibold text-[#e6edf3]'>{day.focus}</h3>
        </div>
        <ul className='m-0 flex list-none flex-col gap-1.5 p-0'>
            {day.tasks.map((task, i) => (
                <li className="flex items-start gap-2 text-[0.845rem] leading-6 text-[#9aa3af]" key={i}>
                    <span className='mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#7d8590]' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const { report, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    if (loading || !report) {
        return (
            <main className={loadingClass}>
                <Loader text="Loading your interview strategy..." />
            </main>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'score--high' :
            report.matchScore >= 60 ? 'score--mid' : 'score--low'

    return (
        <div className='flex min-h-screen w-full items-stretch bg-[#0d1117] p-6 text-[#e6edf3]'>
            <div className='mx-auto flex w-full max-w-[1280px] flex-col justify-between rounded-2xl border border-[#2a3348] bg-[#161b22] lg:flex-row'>
                <nav className='flex flex-shrink-0 flex-col justify-between gap-4 p-4 lg:w-[220px] lg:py-7'>
                    <div>
                        <p className='mb-2 px-3 text-[0.7rem] font-semibold uppercase tracking-widest text-[#7d8590]'>Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition ${activeNav === item.id ? 'bg-[#ff2d78]/10 text-[#ff2d78]' : 'text-[#7d8590] hover:bg-[#1c2230] hover:text-[#e6edf3]'}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='flex flex-shrink-0 items-center'>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => { getResumePdf(interviewId) }}
                        className='flex items-center justify-center rounded-2xl bg-[#e1034d] px-6 py-3 text-sm font-semibold text-white transition active:scale-90'
                    >
                        <svg className="mr-3 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                        Download Resume
                    </button>
                </nav>

                <div className='h-px w-full flex-shrink-0 bg-[#2a3348] lg:h-auto lg:w-px' />

                <main className='max-h-none flex-1 overflow-y-auto px-6 py-7 pb-20 lg:max-h-[calc(100vh-3rem)] lg:px-8'>
                    {activeNav === 'technical' && (
                        <section className="min-h-full">
                            <div className={sectionHeaderClass}>
                                <h2 className="m-0 text-lg font-bold text-[#e6edf3]">Technical Questions</h2>
                                <span className={countClass}>{report.technicalQuestions.length} questions</span>
                            </div>
                            <div className='flex flex-col gap-3'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section className="min-h-full">
                            <div className={sectionHeaderClass}>
                                <h2 className="m-0 text-lg font-bold text-[#e6edf3]">Behavioral Questions</h2>
                                <span className={countClass}>{report.behavioralQuestions.length} questions</span>
                            </div>
                            <div className='flex flex-col gap-3'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section className="min-h-full">
                            <div className={sectionHeaderClass}>
                                <h2 className="m-0 text-lg font-bold text-[#e6edf3]">Preparation Road Map</h2>
                                <span className={countClass}>{report.preparationPlan.length}-day plan</span>
                            </div>
                            <div className='relative flex flex-col before:absolute before:bottom-0 before:left-7 before:top-0 before:w-0.5 before:rounded before:bg-gradient-to-b before:from-[#ff2d78] before:to-[#ff2d78]/10'>
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <div className='h-px w-full flex-shrink-0 bg-[#2a3348] lg:h-auto lg:w-px' />

                <aside className='flex flex-shrink-0 flex-col gap-5 p-5 lg:w-60 lg:py-7'>
                    <div className='flex flex-col items-center gap-2.5'>
                        <p className='m-0 self-start text-xs font-semibold uppercase tracking-widest text-[#7d8590]'>Match Score</p>
                        <div className={`flex h-[90px] w-[90px] flex-col items-center justify-center rounded-full border-4 ${scoreColor === 'score--high' ? 'border-emerald-500' : scoreColor === 'score--mid' ? 'border-amber-500' : 'border-red-500'}`}>
                            <span className='text-2xl font-extrabold leading-none text-[#e6edf3]'>{report.matchScore}</span>
                            <span className='-mt-0.5 text-xs text-[#7d8590]'>%</span>
                        </div>
                        <p className='m-0 text-center text-xs text-emerald-500'>Strong match for this role</p>
                    </div>

                    <div className='h-px bg-[#2a3348]' />

                    <div className='flex flex-col gap-3'>
                        <p className='m-0 text-xs font-semibold uppercase tracking-widest text-[#7d8590]'>Skill Gaps</p>
                        <div className='flex flex-wrap gap-2'>
                            {report.skillGaps.map((gap, i) => (
                                <span key={i} className={`cursor-default rounded-md border px-3 py-1.5 text-xs font-medium ${gap.severity === 'high' ? 'border-red-500/25 bg-red-500/10 text-red-500' : gap.severity === 'medium' ? 'border-amber-500/25 bg-amber-500/10 text-amber-500' : 'border-emerald-500/25 bg-emerald-500/10 text-emerald-500'}`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Interview

import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import Loader from '../../../components/Loader'

const pageClass = "flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-[#0d1117] px-6 py-12 text-[#e6edf3]"
const loadingClass = "flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-[#0d1117] p-8"
const panelHeaderClass = "mb-1 flex items-center gap-2"
const panelIconClass = "flex items-center text-[#ff2d78]"
const badgeClass = "rounded-[0.3rem] border border-[#ff2d78]/30 bg-[#ff2d78]/15 px-2 py-0.5 text-[0.7rem] font-semibold uppercase text-[#ff2d78]"
const textareaClass = "w-full flex-1 resize-none rounded-lg border border-[#2a3348] bg-[#1e2535] px-4 py-3 text-sm leading-6 text-[#e6edf3] outline-none transition placeholder:text-[#7d8590] focus:border-[#ff2d78]"
const sectionLabelClass = "mb-1 flex items-center gap-2 text-sm font-medium text-[#e6edf3]"
const dropzoneBaseClass = "flex cursor-pointer flex-col items-center justify-center gap-1 rounded-[0.6rem] border-2 border-dashed border-[#2a3348] bg-[#1e2535] px-4 py-6 text-center transition hover:border-[#ff2d78] hover:bg-[#ff2d78]/5"
const dropzoneActiveClass = "border-solid border-[#ff2d78] bg-[#ff2d78]/10"

const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const [ resumeFile, setResumeFile ] = useState(null)
    const [ charCount, setCharCount ] = useState(0)
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleJobDescriptionChange = (e) => {
        const text = e.target.value
        setJobDescription(text)
        setCharCount(text.length)
    }

    const handleResumeChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setResumeFile(file)
        }
    }

    const handleGenerateReport = async () => {
        const fileToSend = resumeFile || resumeInputRef.current?.files?.[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile: fileToSend })
        navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return (
            <main className={loadingClass}>
                <Loader text="Generating your interview strategy..." />
            </main>
        )
    }

    return (
        <div className={pageClass}>

            {/* Page Header */}
            <header className='text-center'>
                <h1 className="mb-2 text-4xl font-bold text-[#e6edf3]">Create Your Custom <span className='text-[#ff2d78]'>Interview Plan</span></h1>
                <p className="mx-auto max-w-[480px] text-[0.95rem] leading-relaxed text-[#7d8590]">Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>

            {/* Main Card */}
            <div className='w-full max-w-[900px] overflow-hidden rounded-2xl border border-[#2a3348] bg-[#161b22]'>
                <div className='flex min-h-[520px] flex-col lg:flex-row'>

                    {/* Left Panel - Job Description */}
                    <div className='relative flex flex-1 flex-col gap-4 p-6'>
                        <div className={panelHeaderClass}>
                            <span className={panelIconClass}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2 className="flex-1 text-base font-semibold text-[#e6edf3]">Target Job Description</h2>
                            <span className={badgeClass}>Required</span>
                        </div>
                        <textarea
                            onChange={handleJobDescriptionChange}
                            className={textareaClass}
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='absolute bottom-5 right-6 rounded-md border border-[#ff2d78]/30 bg-[#ff2d78]/10 px-3 py-1.5 text-xs font-semibold text-[#ff2d78]'>{charCount} / 5000 chars</div>
                    </div>

                    {/* Vertical Divider */}
                    <div className='h-px w-full flex-shrink-0 bg-[#2a3348] lg:h-auto lg:w-px' />

                    {/* Right Panel - Profile */}
                    <div className='flex flex-1 flex-col gap-3 p-6'>
                        <div className={panelHeaderClass}>
                            <span className={panelIconClass}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2 className="flex-1 text-base font-semibold text-[#e6edf3]">Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className='flex flex-col gap-2'>
                            <label className={sectionLabelClass}>
                                Upload Resume
                                <span className={badgeClass}>Best Results</span>
                            </label>
                            <label className={`${dropzoneBaseClass} ${resumeFile ? dropzoneActiveClass : ''}`} htmlFor='resume'>
                                {resumeFile ? (
                                    <>
                                        <span className='mb-1 text-emerald-500'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        </span>
                                        <p className='m-0 text-sm font-medium text-emerald-500'>File Uploaded</p>
                                        <p className='m-0 break-words text-xs font-semibold text-[#ff2d78]'>{resumeFile.name}</p>
                                    </>
                                ) : (
                                    <>
                                        <span className='mb-1 text-[#ff2d78]'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                        </span>
                                        <p className='m-0 text-sm font-medium text-[#e6edf3]'>Click to upload or drag &amp; drop</p>
                                        <p className='m-0 text-xs text-[#7d8590]'>PDF or DOCX (Max 5MB)</p>
                                    </>
                                )}
                                <input ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' onChange={handleResumeChange} />
                            </label>
                        </div>

                        {/* OR Divider */}
                        <div className='flex items-center gap-3 text-xs text-[#7d8590] before:h-px before:flex-1 before:bg-[#2a3348] after:h-px after:flex-1 after:bg-[#2a3348]'><span className="whitespace-nowrap">OR</span></div>

                        {/* Quick Self-Description */}
                        <div className='flex flex-col gap-2'>
                            <label className={sectionLabelClass} htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                id='selfDescription'
                                name='selfDescription'
                                className={`${textareaClass} h-24 flex-none`}
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='flex items-start gap-2.5 rounded-lg border border-[#2d4a7a] bg-[#1b2a4a] px-4 py-3'>
                            <span className='mt-px flex-shrink-0 text-[#4a90e2]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p className="m-0 text-xs leading-6 text-[#8ab4f8]">Either a <strong className="text-[#e6edf3]">Resume</strong> or a <strong className="text-[#e6edf3]">Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className='flex flex-col items-stretch justify-between gap-4 border-t border-[#2a3348] px-6 py-4 sm:flex-row sm:items-center'>
                    <span className='text-xs text-[#7d8590]'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        className='flex items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-[#ff2d78] to-[#cc0f52] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 active:scale-[0.98]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className='flex w-full max-w-[900px] flex-col gap-3'>
                    <h2 className="text-xl font-semibold">My Recent Interview Plans</h2>
                    <ul className='flex flex-wrap gap-3'>
                        {reports.map(report => (
                            <li key={report._id} className='flex min-w-60 flex-1 cursor-pointer flex-col gap-2 rounded-lg border border-[#2a3348] bg-[#161b22] p-4 transition hover:border-[#3a4560]' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3 className="text-base font-semibold">{report.title || 'Untitled Position'}</h3>
                                <p className='text-sm text-[#7d8590]'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`text-xs font-semibold ${report.matchScore >= 80 ? 'text-emerald-500' : report.matchScore >= 60 ? 'text-amber-500' : 'text-red-500'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Page Footer */}
            <footer className='flex gap-6'>
                <a className="text-xs text-[#7d8590] transition hover:text-[#e6edf3]" href='#'>Privacy Policy</a>
                <a className="text-xs text-[#7d8590] transition hover:text-[#e6edf3]" href='#'>Terms of Service</a>
                <a className="text-xs text-[#7d8590] transition hover:text-[#e6edf3]" href='#'>Help Center</a>
            </footer>
        </div>
    )
}

export default Home

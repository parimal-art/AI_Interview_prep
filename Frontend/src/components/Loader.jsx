import React from 'react'

const Loader = ({ text = "Processing..." }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-8 px-8 py-12">
            <div className="relative h-20 w-20 animate-float-loader">
                <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-r-[#ff2d78] border-t-[#ff2d78] animate-spin-slow"></div>
                <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-b-[#ff2d78] border-l-[#ff2d78] animate-spin-reverse"></div>
                <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-r-[#ff2d78]/50 border-t-[#ff2d78]/50 animate-pulse-ring"></div>
            </div>
            <p className="m-0 text-base font-medium tracking-wide text-[#e6edf3]">{text}</p>
        </div>
    )
}

export default Loader

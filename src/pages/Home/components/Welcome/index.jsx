import { useState } from "react";
import { Logo_lg, text_logo_white_lg } from "@/assets/Logo";
import { Madrasa, welcome } from "@/assets/images";
import { Calendar } from 'lucide-react';

const StatiCard = ({ titles, values }) => {
    return (
        <div className="stati-card">
            {titles.map((title, index) => (
                <div key={index} className={`stat-item ${index > 0 ? 'border-left' : ''}`}>
                    <p className="value">{values[index]}</p>
                    <h1 className="title">{title}</h1>
                </div>
            ))}
        </div>
    );
};


const DateCard = ({ day, month, year }) => {
    return (
        <div className="date-card">
            <span className="flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"><Calendar /></span>
            <span>{day}</span>
            <span>{month}</span>
            <span>{year}</span>
        </div>
    );
};

function Welcome() {
    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <div className="flex flex-col mx-auto ">
            <div className="relative p-3">
                {/* Skeleton loader when the image is loading */}
                {loading && <div className="w-full h-[350px] md:h-[650px] bg-gray-300 animate-pulse rounded-xl"></div>}

                <img
                    src={welcome}
                    alt="welcome"
                    className={`w-full h-auto ${loading ? 'hidden' : 'block'}`}
                    onLoad={handleImageLoad}
                />
                <div className="welcome-container">
                    <div className="logo-container">
                        <img src={Logo_lg} alt="alt_" className="logo" />
                        <img src={text_logo_white_lg} alt="alt_" className="text-logo" />
                    </div>

                    <div className="info-container">
                        <div className="date-card">
                            <DateCard month="September" day="14 - 17" year="2024" />

                        </div>
                        <div className="stats-card">
                            <StatiCard titles={["Days", "Events", "Students"]} values={["4", "30+", "300+"]} />
                        </div>
                    </div>
                </div>

                {/* <div className="absolute top-0 flex flex-col items-center justify-between h-full w-full left-0">
                    <div className="flex flex-col items-center mt-6 gap-2 sm:mt-8 md:mt-16 md:gap-6">
                        <img src={Logo_lg} alt="alt_" className="w-16 h-auto sm:w-20 md:w-24" />
                        <img src={text_logo_white_lg} alt="alt_" className="w-44 h-auto sm:w-56 md:w-72" />
                    </div>
                    <div className="flex flex-col items-center gap-6 -mb-0 sm:-mb-8 md:-mb-14">
                    </div>
                </div> */}
            </div>

            <section className="flex flex-col items-center justify-center mt-4 md:mt-20">
                <h1 className="text-2xl md:text-4xl font-bold text-black my-6 mt-10 flex flex-col md:flex-row gap-2 items-center justify-center">
                    Welcome to <span className="text-sky-400">Muhibbi Season 3</span>
                </h1>
                <div className="flex items-center justify-center flex-col md:flex-row p-4 md:p-0">
                    <div className="md:w-1/2 max-w-[550px] p-2 md:p-4">
                        <img src={Madrasa} alt="Madrasa" className="w-auto h-auto  object-cover" />
                    </div>
                    <p className="md:w-1/2 flex flex-col text-center md:text-left p-0 pt-4 md:p-8 leading-7 space-y-4 text-md md:text-xl">
                        <span>
                            In the blessed month of Rabi' al-Awwal, we come together to celebrate the birth of our beloved Prophet Muhammad (PBUH). This sacred time marks not only a moment of deep spiritual reflection but also a celebration of love, compassion, and unity within our community.
                        </span>
                        <span>
                            Our Madrasa is honored to present live coverage of this year's Rabi' al-Awwal celebrations. Join us as we provide real-time updates, spiritual teachings, and events marking this significant occasion. Whether you're here to participate in the festivities, learn more about the life of the Prophet (PBUH), or simply to stay connected with our community, we welcome you with open hearts.
                            May this month bring you closer to the teachings of the Prophet (PBUH) and fill your life with peace and blessings.
                        </span>
                    </p>
                </div>
            </section>
        </div >
    );
}

export default Welcome;

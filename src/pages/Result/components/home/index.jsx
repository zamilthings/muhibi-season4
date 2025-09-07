import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchRecords } from "@/utils/airtableService";
import { motion, AnimatePresence } from "framer-motion";
import Poster from "@/components/common/Poster";
import { ChevronLeft, Loader, Share2 } from "lucide-react"
import html2canvas from 'html2canvas';

function Results() {
    const [resultList, setResultList] = useState([]);
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const [showResultCard, setShowResultList] = useState(true);
    const [showCard, setShowCard] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [Loading, setLoading] = useState(true);
    const [isloading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tableName = "Published Programs";
                const filterBy = "";
                const sortField = "auto";
                const sortDirection = "desc";
                const Records = await fetchRecords(
                    tableName,
                    filterBy,
                    sortField,
                    sortDirection
                );

                // Add isNew flag for each program
                const enrichedRecords = Records.map(record => ({
                    ...record,
                    isNew: isNewRelease(record.fields.Created),
                }));

                setResultList(enrichedRecords);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const getPrograms = async (item) => {
        setIsLoading(true);
        setShowCard(false);
        setShowResultList(false);
        const SingleRecord = [];

        try {
            const tableName = "Result";
            const filterBy = `{Program} = '${item.fields.Name}'`;
            const sortField = "Place";
            const sortDirection = 'asc';
            const Records = await fetchRecords(
                tableName,
                filterBy,
                sortField,
                sortDirection
            );
            // console.log(item.fields);
            // console.log(Records);
            SingleRecord.push({
                programName: item.fields.Name,
                ProgramCategory: item.fields.Category,
                records: Records,
                stage: Records[0]?.fields.Stage,
            });
            setResult(SingleRecord);
            setShowCard(true);
            // console.log(SingleRecord);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setIsLoading(false);
        }
    };

    // Helper to save blob as file
    const saveBlobAsFile = (blob, fileName) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
    };

    // Download poster
    const handleDownload = async (programName) => {
        const poster = document.getElementById('poster');
        if (!poster) return;

        setDownloading(true);
        const canvas = await html2canvas(poster, {
            scale: 4,        // Higher scale = sharper
            useCORS: true,
            allowTaint: true
        }); // ✅ sharper
        canvas.toBlob((blob) => {
            if (blob) {
                saveBlobAsFile(blob, `${programName || 'poster'}.png`);
            }
            setDownloading(false);
        }, 'image/png');
    };

    // Share poster (with clarity fix)
    const handleShare = async (programName) => {
        const poster = document.getElementById('poster');
        if (!poster) return;

        const canvas = await html2canvas(poster, {
            scale: 4,        // Higher scale = sharper
            useCORS: true,
            allowTaint: true
        }); // ✅ sharper
        canvas.toBlob(async (blob) => {
            if (!blob) return;
            const fileName = `${programName || 'poster'}.png`;
            const file = new File([blob], fileName, { type: 'image/png' });

            if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        title: programName || 'Muhibbi S4',
                        text: "Check out the winners! 🎉",
                        url: "https://muhibbi-season4.vercel.app/",
                        files: [file],
                    });
                } catch (err) {
                    console.error("Error sharing:", err);
                    saveBlobAsFile(blob, fileName);
                }
            } else {
                saveBlobAsFile(blob, fileName);
            }
        }, 'image/png');
    };



    const isNewRelease = (dateString) => {
        if (!dateString) return false;

        const currentDate = new Date();
        const programDate = new Date(dateString);

        if (isNaN(programDate)) return false;

        // Both are timestamps in ms (UTC-based under the hood)
        const timeDifference = Math.abs(currentDate.getTime() - programDate.getTime()) / (1000 * 60);

        return timeDifference <= 7;
    };






    return (
        <div className="relative overflow-x-hidden">
            <div className="relative z-40 flex flex-col items-center justify-center p-1 md:p-10">
                <NavLink to="/" className="text-black font-semibold text-lg absolute top-6 left-6 md:left-10 z-10 flex  items-center">
                    <ChevronLeft size={20} />&nbsp;Home
                </NavLink>

                <div className="font-bold text-center text-4xl p-10">Results</div>
                <div className="flex justify-center flex-col items-center mx-auto w-full ">
                    <input
                        type="text"
                        placeholder="Search Program"
                        className="custom-width bg-[#003F06] placeholder:text-white text-white w-full max-w-[500px] h-12 px-6 border-none rounded-lg focus:outline-none mb-6 min-w-[300px] focus:shadow-lg transition duration-300 ease-in-out"
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setShowResultList(true);
                            setShowCard(false);
                        }}
                    />
                    <AnimatePresence>
                        {showResultCard && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, x: 300 }}
                                transition={{ duration: 0.3 }}
                            >
                                {resultList.length ? (
                                    <div className="flex justify-center items-center gap-4  p-1 w-full flex-wrap">
                                        <AnimatePresence>
                                            {resultList.filter((val) => {
                                                if (search === "") {
                                                    return val;
                                                } else if (
                                                    val.fields.Name !== undefined && val.fields?.Name.toLowerCase().includes(search && search.toLowerCase())
                                                ) {
                                                    return val;
                                                }
                                            }).map((item, index) => (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8, x: -300 }}
                                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                                    exit={{ opacity: 0, scale: 0.8, x: 300 }}
                                                    transition={{ duration: 0.2, delay: index * 0.1 }}
                                                    key={index}
                                                    className=""
                                                >
                                                    <div className="relative bg-green-200/80 px-3 md:px-6 py-1 md:py-2 rounded-xl cursor-pointer hover:scale-105 transition-all ease-in-out duration-300  w-fit" onClick={() => getPrograms(item)}>
                                                        <p className="text-sm    sm:text-lg font-medium whitespace-nowrap">{item.fields.Name}</p>
                                                        {console.log(item)}
                                                        {item.isNew && (
                                                            <span className="absolute -top-[15px] -right-[6px]  transform translate-x-1 translate-y-1 text-[9px] font-semibold text-white bg-[#003F06]  border-2 border-[#003F06] clip-path-star px-1 py-[1px] shadow-lg rounded-md rounded-bl-none">
                                                                New
                                                            </span>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                        {resultList.filter((val) => val.fields.Name && val.fields.Name.toLowerCase().includes(search.toLowerCase())).length === 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.5, delay: 1 }}
                                                className="text-[#003F06] font-semibold"
                                            >
                                                No search Found
                                            </motion.div>
                                        )}
                                    </div>
                                ) : (
                                    Loading ? (
                                        <span className="font-semibold mx-auto flex gap-2 items-center my-4">Loading <Loader className="animate-spin" /></span>
                                    ) : (
                                        <p className="text-center mt-4 font-semibold">No results found</p>
                                    )
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mx-auto w-full my-50">
                    <AnimatePresence>
                        {isloading && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center justify-center gap-2 mx-auto w-full my-4 min-h-[200px]">Loading <Loader className="animate-spin" /></motion.p>
                        )}
                        {showCard && (
                            <motion.div
                                initial={{ opacity: 0, x: -300 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 300 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div id="poster" className="w-fit h-fit mx-auto">
                                    <Poster
                                        programCategory={result[0]?.ProgramCategory}
                                        programName={result[0]?.programName}
                                        stage={result[0]?.stage}
                                        records={result[0]?.records}
                                    />
                                </div>

                                <div className="flex custom-width gap-2 mx-auto">
                                    <button
                                        className="bg-[#003F06] text-white font-bold py-3 px-6 rounded-md uppercase text-[16px] mt-4 mx-auto  w-full flex items-center justify-center transition-all ease-in-out hover:bg-green-700 custom-width"
                                        onClick={() => handleDownload(result[0]?.programName)}
                                        disabled={downloading}
                                    >
                                        {!downloading ? "Download Now" : <Loader className="animate-spin" />}
                                    </button>
                                    <button className='bg-[#003F06] text-white font-bold py-3 px-6 rounded-md uppercase text-[16px] mt-4 mx-auto flex items-center justify-center transition-all ease-in-out hover:bg-green-700 custom-width' onClick={() => handleShare(result[0]?.programName)}>
                                        <span ><Share2 /></span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default Results;

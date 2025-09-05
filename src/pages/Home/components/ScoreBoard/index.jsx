import { useEffect, useState } from "react";
import { fetchRecords } from "@/utils/airtableService";
import { motion } from "framer-motion"
import { Crown } from "@/assets/images"
import classNames from 'classnames';
import { Loader } from "lucide-react";

function ScoreBoard() {

  const [scoreBoardData, setScoreBoardData] = useState([]);
  const [animationRunning, setAnimationRunning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tableName = 'Group';
        const filterBy = '';
        const sortField = 'Total';
        const sortDirection = 'desc';
        const Records = await fetchRecords(tableName, filterBy, sortField, sortDirection);
        // const colors = ['teal', 'orange', 'pink'];
        const RecordsData = Records.map((record, index) => ({
          ...record,
          fields: {
            ...record.fields,
            // color: colors[index % colors.length],
          },
        }));
        // console.log(RecordsData);
        setScoreBoardData(RecordsData)

      } catch (error) {
        console.error(error);
      }
    }

    fetchData();

  }, []);


  return (
    <div className='my-10 md:my-20'>
      <div className='w-full' id="scoreboard">
        <h1 className='text-2xl font-bold md:text-4xl text-center capitalize mb-28 md:mb-20'>Score Board</h1>
        {scoreBoardData.length ? (
          <div className=" md:gap-3 gap-8 flex flex-col md:flex-row mx-auto "  >
            {scoreBoardData.map((item, index) => (
              <div key={index} className="mx-auto">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  viewport={{ once: true }} className={classNames('w-56 h-72 rounded-full mx-auto shadow-lg relative card border',
                    `card${index + 1})`,
                    {
                      'border-[#003F06] bg-[#D3FFD7]': item.fields.color === 'teal',
                      'border-[#721872] bg-[#FFE0FC]': item.fields.color === 'pink',
                      'border-[#F07F07] bg-[#FFF3E6]': item.fields.color === 'orange'
                    })}>
                  {/* stars for first position */}
                  {index === 0 && <div className='absolute -top-14 left-0 w-full  rounded-lg '>
                    <div className="flex h-14 gap-2 items-center justify-around">
                      <img src={Crown} className="h-28" />
                    </div>
                  </div>}
                  {/* custom css for Positons */}
                  <div className="flex items-center justify-center w-full h-full max-h-[300px] z-10  text-center flex-col">
                    <h2 className={classNames('text-[100px] h-10 top-0 font-bold',
                      {
                        'text-[#00646633]': item.fields.color === 'teal',
                        'text-[#F07F0733]': item.fields.color === 'orange',
                        'text-[#4D194D33]': item.fields.color === 'pink'
                      }
                    )}> {index + 1}</h2>
                    <h6
                      className={classNames(
                        'text-3xl uppercase mt-20 font-bold',
                        `card-team-${index + 1}`,
                        {
                          'text-[#003F06]': item.fields.color === 'teal',
                          'text-[#F07F07]': item.fields.color === 'orange',
                          'text-[#721872]': item.fields.color === 'pink'
                        }
                      )}
                    >{item.fields.Name}</h6>
                    <span className="mt-4 text-center text-2xl mx-auto font-bold h-2 text-[#262626E5]">{item.fields.Total} <span className="font-semibold text-lg">pts</span></span>
                  </div>
                </motion.div >
                {index % 2 !== 0 && <div className="scoreCard--responsive" />}
              </div>
            ))}
          </div>
        ) : (<div className="mx-auto my-4 w-full  flex items-center justify-center">
          <span className="font-bold flex items-center gap-2 justify-center mx-auto">Loading <Loader className="animate-spin" /></span>
        </div>)
        }
      </div>
    </div >


  )
}


export default ScoreBoard

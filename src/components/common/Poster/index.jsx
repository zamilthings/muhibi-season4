import { motion } from 'framer-motion';
import { onStage, offStage } from "@/assets/poster";
import classNames from 'classnames';

// badges
import Firstbadge from '@/assets/poster/1st.png';
import Secondbadge from '@/assets/poster/2.png';
import Thirdbadge from '@/assets/poster/3rd.png';


const Poster = ({ programCategory, programName, stage, records }) => {


  const getBadgeImage = (place) => {
    console.log(place);
    switch (place) {
      case "First":
        return Firstbadge;
      case "Second":
        return Secondbadge;
      case "Third":
        return Thirdbadge;
      default:
        return '';
    }
  };


  const groupRecordsByPlace = (records) => {
    const groupedRecords = {};
    records.forEach((record) => {
      const place = record.fields.Place;
      if (!groupedRecords[place]) {
        groupedRecords[place] = [];
      }
      groupedRecords[place].push(record);
    });
    return groupedRecords;
  };
  // console.log(programCategory)

  const TotalWinners = records?.reduce((total, record) => {
    // Case 1: multiple winners stored as array in "Winner" field
    if (Array.isArray(record.fields.Winner)) {
      return total + record.fields.Winner.length;
    }

    // Case 2: single winner (string, object, or missing)
    return total + 1;
  }, 0) || 0;


  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ duration: 0.2 }}

    >
      <div className="poster-card rounded overflow-hidden mx-auto shadow-xl relative" id='poster'>
        <img
          src={stage === "OFF STAGE" ? offStage : onStage}
          alt="poster"
          className="w-full h-auto object-cover"
        />
        <div className='custom-top-programName'>
          <p className={classNames(
            'font-bold uppercase custom-program-name text-white',
          )}>
            {programName}
          </p>
          <p
            className={classNames(
              'custom-program-category text-white',
            )}>
            {programCategory}
          </p>
        </div>

        <div className={`custom-top-winners text-white gap-3 ${TotalWinners > 5 ? "-mt-5 !gap-2" : ""}`}>
          {Object.entries(groupRecordsByPlace(records)).map(([place, records]) => (
            <div key={place} className={`flex gap-2 sm:gap-[14px] items-start  `}>
              <div>
                <img src={getBadgeImage(place)} alt={`Badge ${place}`} className={`top-0 w-[12px] sm:w-4 max-w-4  text-white ${TotalWinners > 5 ? "!w-[10px]" : ""}`} />
              </div>
              <div className={`${records.length > 1 ? '' : ''}`}>
                {/* Display winner(s) and department(s) for each place */}
                {records.map((record, index) => (
                  <div key={index}
                    className={classNames(
                      'flex  flex-col leading-3 text-white items-start justify-start ',
                      { 'h-4 sm:h-6': TotalWinners > 5  },
                    )}>
                    <p className={`font-semibold text-sm custom-winner-name`}>
                      {record.fields.Name}
                    </p>
                    <p className={` text-[11px] custom-winner-team mt-1 `}>
                      {record.fields.Team}
                    </p>
                  </div>
                ))}
                <div>


                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </motion.div >
  );
};

export default Poster;

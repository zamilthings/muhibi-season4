import { motion } from 'framer-motion';
import { onStage, offStage } from "@/assets/poster";
import classNames from 'classnames';


const Poster = ({ programCategory, programName, stage, records }) => {

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

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ duration: 0.2 }}

    >
      <div className="poster-card rounded-lg overflow-hidden mx-auto shadow-xl relative" id='poster'>
        <img
          src={stage === "OFF STAGE" ? offStage : onStage}
          alt="poster"
          className="w-full h-auto object-cover"
        />
        <div className='custom-top-programName'>
          <p className={classNames(
            'font-bold uppercase custom-program-name',
            {
              'text-purple-800': stage === 'OFF STAGE',
              'text-amber-900': stage === 'ON STAGE'
            })}>
            {programName}
          </p>
          <p
            className={classNames(
              'custom-program-category',
              {
                'text-purple-800': stage === 'OFF STAGE',
                'text-amber-900': stage === 'ON STAGE'
              })}>
            {programCategory}
          </p>
        </div>
        <div className='custom-top-winners'>
          {Object.entries(groupRecordsByPlace(records)).map(([place, records]) => (
            <div key={place} className="flex gap-4 items-start">
              {records.map((record, index) => (
                <div key={index}
                  className={classNames(
                    'flex  flex-col leading-4',
                    {
                      'text-purple-800': stage === 'OFF STAGE',
                      'text-amber-900': stage === 'ON STAGE'
                    })}>
                  <p className={`font-semibold text-sm custom-winner-name`}>
                    {record.fields.Name}
                  </p>
                  <p className={` text-[11px] custom-winner-team -mt-1`}>
                    {record.fields.Team}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
};

export default Poster;

import { boy, girl } from "@/assets/images";
import classNames from 'classnames';
import { motion } from "framer-motion"

function Captain() {
  const Teams = [
    {
      name: "KAMAR",
      color: "teal",
      captains: [
        { name: "Niyas Muhammed", gender: "male" },
        { name: "Fathima Rahba", gender: "female" },
      ],
    },
    {
      name: "HILAL",
      color: "purple",
      captains: [
        { name: "Sinan KT", gender: "male" },
        { name: "Aflaha KK", gender: "female" },
      ],
    },
    {
      name: "BADR",
      color: "amber",
      captains: [
        { name: "Bishr", gender: "male" },
        { name: "Rinsha", gender: "female" },
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h2 className="text-2xl md:text-4xl font-bold my-10">Captains</h2>
      <div className="flex justify-around w-full my-10 flex-col md:flex-row gap-14 md:gap-2" id="captains">
        {Teams.map((team, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            viewport={{ once: true }} >
            <div
              key={index}
              className={classNames(`border-2  p-4 rounded-lg min-w-[230px] max-w-[300px] mx-auto`,
                {
                  'border-teal-500': team.color === 'teal',
                  'border-amber-500': team.color === 'amber',
                  'border-purple-500': team.color === 'purple'
                })}
            >
              <h3
                className={classNames(`font-semibold text-lg  text-white p-2 rounded-lg text-center -mt-10 mb-6`,
                  {
                    'bg-teal-700': team.color === 'teal',
                    'bg-orange-500': team.color === 'amber',
                    'bg-purple-900': team.color === 'purple'
                  })}
              >
                {team.name}
              </h3>
              <div>
                {team.captains.map((captain, index) => (
                  <div key={index}
                    className={classNames(`flex items-center mb-2 text-white  p-2 rounded-lg`,
                      {
                        'bg-teal-700': team.color === 'teal',
                        'bg-orange-500': team.color === 'amber',
                        'bg-purple-900': team.color === 'purple'
                      })}>
                    <div className="bg-white rounded-lg mr-2">
                      <img
                        src={captain.gender === "male" ? boy : girl}
                        alt={captain.name}
                        className="w-10 h-10"
                      />
                    </div>
                    <span className="font-semibold">{captain.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Captain;

import { boy, girl } from "@/assets/images";
import classNames from 'classnames';
import { motion } from "framer-motion"

function Captain() {
  const Teams = [
    {
      name: "AMAWIYYA",
      color: "teal",
      captains: [
        { name: "Muhammed Adnan K K", gender: "male", role: "Leader" },
        { name: "Muhammed Dilshah P T", gender: "male", role: "Assistant Leader" },
        { name: "Nabeela K P", gender: "female", role: "Leader" },
        { name: "Fathima Fahmidha T", gender: "female", role: "Assistant Leader" },
      ],
    },
    {
      name: "ABBASIYYA",
      color: "pink",
      captains: [
        { name: "Riyas", gender: "male", role: "Leader" },
        { name: "Rishad K T", gender: "male", role: "Assistant Leader" },
        { name: "Fathima Riya C", gender: "female", role: "Leader" },
        { name: "Fahmidha Febi V P", gender: "female", role: "Assistant Leader" },
      ],
    },
    {
      name: "USMAANIYYA",
      color: "orange",
      captains: [
        { name: "Rahif", gender: "male", role: "Leader" },
        { name: "Sinan", gender: "male", role: "Assistant Leader" },
        { name: "Fathima Musna V P", gender: "female", role: "Leader" },
        { name: "Fanha K P", gender: "female", role: "Assistant Leader" },
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
                  'border-[#003F06]': team.color === 'teal',
                  'border-[#F07F07]': team.color === 'orange',
                  'border-[#4D194D]': team.color === 'pink'
                })}
            >
              <h3
                className={classNames(`font-semibold text-lg  text-white p-2 rounded-lg text-center -mt-10 mb-6`,
                  {
                    'bg-[#003F06]': team.color === 'teal',
                    'bg-[#F07F07]': team.color === 'orange',
                    'bg-[#4D194D]': team.color === 'pink'
                  })}
              >
                {team.name}
              </h3>
              <div>
                {team.captains.map((captain, index) => (
                  <div key={index}
                    className={classNames(`flex items-center mb-2 text-white  p-2 rounded-lg`,
                      {
                        'bg-[#003F06]': team.color === 'teal',
                        'bg-[#F07F07]': team.color === 'orange',
                        'bg-[#4D194D]': team.color === 'pink',
                        'mb-6': index === 1
                      })}>
                    <div className="bg-white rounded-lg mr-2">
                      <img
                        src={captain.gender === "male" ? boy : girl}
                        alt={captain.name}
                        className="w-10 h-10"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">{captain.name}</span>
                      <span className="font-medium text-sm">{captain.role}</span>
                    </div>
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

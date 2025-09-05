import { Logo_sm, Logo_lg, text_logo_clr, partner, text_logo_white_sm, text_logo_white_lg } from "@/assets/Logo";
import { Phone } from 'lucide-react';
import { useState } from "react";

function Footer() {
  const [message, setMessage] = useState("");
  const handleClick = () => {
    setMessage("");
    alert("Thank you for your feedback!")
  }
  return (
    <div>
      <footer className="p-8 pb-6 flex w-full justify-between max-w-[1200px] mx-auto flex-col-reverse md:flex-row gap-6">
        <div className="flex flex-col gap-4 justify-between md:mx-0 mx-auto">
          <img src={text_logo_white_lg} alt="alt_" className="w-auto h-auto max-w-[220px] md:mx-0 mx-auto" />
          <div className="bg-gray-300 rounded-xl p-2 flex flex-col space-y-2 w-[300px] ">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-4 rounded-xl w-full h-20 min-h-20"
              placeholder="Type Here" ></textarea>
            <button className="bg-black rounded-lg text-white font-semibold py-1 px-4 self-end text-sm" onClick={handleClick}>Submit</button>
          </div>
        </div>
        <div className="flex flex-col text-white flex-1  items-center md:items-end md:mx-0 mx-auto">
          <img src={Logo_lg} alt="alt_" className="w-auto h-auto max-w-[80px]" />
          <p className="font-semibold text-center">Madrasathul Muhammadiyya,Mukkam Mahall </p>
          <div className="flex flex-col mt-6">
            <h3 className="text-center font-bold">Media Partner</h3>
            <div className="bg-white p-2 rounded-lg flex items-center justify-center">
              <img src={partner} alt="alt_" className="w-auto h-auto max-w-[200px] " />
            </div>
            <a href="https://wa.me/91322323232">
              <p className="flex gap-2 items-center my-2 justify-center md:justify-end">
                +91 7034916695 <Phone size={18} />
              </p>
            </a>
          </div>
        </div>
      </footer >
      <p className="text-center text-sm pb-4 text-white font-semibold select-none">Crafted with 🤍 by <a href="https://www.linkedin.com/in/muhammed-shamil-65878227a/" >Shamil</a> & <a href="https://www.linkedin.com/in/muhammed-saleel-cp-84064524b/">Saleel</a></p>
    </div >
  )
}

export default Footer


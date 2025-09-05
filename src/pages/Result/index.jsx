import React from 'react'
import { Results } from './components'
import { motion } from "framer-motion"

function Result() {
  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
       
      >
        <Results />
      </motion.div>
  )
}

export default Result

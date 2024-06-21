'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import Book1 from '../assets/Book1.jpg';
import Book2 from '../assets/Book2.jpg';
import Book3 from '../assets/Book3.jpg';

function BooksAnimation() {
  return (
    <div className="relative w-full flex items-center justify-center " style={{background: "radial-gradient(circle at center, var(--indigo-500) 0, var(--indigo-200) 30%,  transparent 50%)"}}>
      <motion.div drag className="z-3 absolute shadow-2xl" whileHover={{ scale: 1.1, y:-100}} animate={{zIndex: 3, y:-50, }} transition={{duration: 1.3, ease:'easeInOut'}}>
        <Image src={Book1} alt="Book1"></Image>
      </motion.div>
      <motion.div className="z-2 absolute shadow-2xl" whileHover={{ scale: 1.1, x:-300  }} animate={{x: -200, y: 150, rotateZ:-20}} transition={{duration: 1.2, ease:'easeInOut'}}>
        <Image src={Book2} alt="Book2"></Image>
      </motion.div>
      <motion.div className="z-1 absolute shadow-2xl" whileHover={{ scale: 1.1, x:300 }} animate={{x: 200, y: 150, rotateZ:40}} transition={{duration: 1.4, ease:'easeInOut'}}>
        <Image src={Book3} alt="Book3"></Image>
      </motion.div>
    </div>
  );
}

export default BooksAnimation;

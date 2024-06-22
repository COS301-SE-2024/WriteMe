'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import Book1 from '../assets/Book1.jpg';
import Book2 from '../assets/Book2.jpg';
import Book3 from '../assets/Book3.jpg';

function BooksAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center " style={{background: "radial-gradient(circle at center, var(--indigo-500) 0, var(--indigo-200) 40%,  transparent 60%)"}}>
      <motion.div drag className="z-3 absolute shadow-2xl w-[35ch] aspect-[13/20]" whileHover={{ scale: 1.05, y:-100}} animate={{zIndex: 3, y:-100, rotateZ: -35 }} transition={{duration: 1.3, ease:'easeInOut'}}>
        <Image src={Book1} fill alt="Book1"></Image>
      </motion.div>
      <motion.div  drag className="z-2 absolute shadow-2xl w-[35ch] aspect-[13/20]" whileHover={{ scale: 1.05, x:-300  }} animate={{x: -250, y: 300, rotateZ:-10}} transition={{duration: 1.2, ease:'easeInOut'}}>
        <Image src={Book2} fill alt="Book2"></Image>
      </motion.div>
      <motion.div drag className="z-1 absolute shadow-2xl w-[35ch] aspect-[13/20]" whileHover={{ scale: 1.05, x:500 }} animate={{x: 400, y: 300, rotateZ:25}} transition={{duration: 1.4, ease:'easeInOut'}}>
        <Image src={Book3} fill alt="Book3"></Image>
      </motion.div>
    </div>
  );
}

export default BooksAnimation;

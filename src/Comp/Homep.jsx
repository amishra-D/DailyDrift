import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const taglines = [
  "Track your habits, transform your life.",
  "Small steps, big changes.",
  "Consistency creates success.",
  "One habit at a time.",
  "Your daily dose of discipline.",
  "Build streaks, break limits.",
  "Stay focused, stay on track.",
  "Habitity: Make progress visible.",
  "Shape your future one habit at a time.",
  "Check in. Level up."
];

const Homep = ({user}) => {
  
  const navigate=useNavigate()
  const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];

  return (
    <div className="relative flex flex-col justify-between w-full h-screen overflow-hidden px-4">
      <motion.div 
       initial={{ opacity: 0, y: 10 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.5 }}
       className='absolute top-6 right-4 flex gap-2 flex-col sm:flex-row'>
        <Button variant='default' onClick={()=>navigate('/login')} className="text-sm px-3 h-8 sm:text-base sm:px-4 sm:h-9">Log In</Button>
        <Button variant='default' onClick={()=>navigate('/signup')} className="text-sm px-3 h-8 sm:text-base sm:px-4 sm:h-9">Sign Up</Button>
      </motion.div>

      <div className="flex flex-col gap-3 mt-12 ml-4 sm:ml-20 sm:gap-4 sm:mt-16">
        <motion.h1 
          className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-[#ff416c] via-[#ff4b2b] to-[#ff6a00] bg-clip-text text-transparent sm:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          HABITITY
        </motion.h1>
        
        <motion.p 
          className="text-base opacity-80 max-w-xs sm:text-xl sm:max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {randomTagline}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button variant="default" onClick={()=>{
  user ? navigate('/dashboard') : navigate('/signup')
}}
          className="mt-3 text-sm h-9 sm:mt-4 sm:text-base sm:h-10">
            Get Started
          </Button>
        </motion.div>
      </div>

      <div className="absolute -bottom-5 left-0 w-full overflow-hidden z-[-1] h-[40vh] sm:h-auto">
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="w-full h-full mix-blend-hard-light"
          viewBox="0 0 900 600"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <motion.g
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <path d="M0 367L21.5 368.3C43 369.7 86 372.3 128.8 377.7C171.7 383 214.3 391 257.2 396.7C300 402.3 343 405.7 385.8 399.2C428.7 392.7 471.3 376.3 514.2 366.5C557 356.7 600 353.3 642.8 359.8C685.7 366.3 728.3 382.7 771.2 397.2C814 411.7 857 424.3 878.5 430.7L900 437L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z" fill="#fa7268"></path>
            <path d="M0 419L21.5 426.8C43 434.7 86 450.3 128.8 458C171.7 465.7 214.3 465.3 257.2 456C300 446.7 343 428.3 385.8 430.8C428.7 433.3 471.3 456.7 514.2 456.2C557 455.7 600 431.3 642.8 420.2C685.7 409 728.3 411 771.2 416.3C814 421.7 857 430.3 878.5 434.7L900 439L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z" fill="#ef5f67"></path>
            <path d="M0 482L21.5 475.2C43 468.3 86 454.7 128.8 457.5C171.7 460.3 214.3 479.7 257.2 488.2C300 496.7 343 494.3 385.8 491.7C428.7 489 471.3 486 514.2 485.8C557 485.7 600 488.3 642.8 492.5C685.7 496.7 728.3 502.3 771.2 499.8C814 497.3 857 486.7 878.5 481.3L900 476L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z" fill="#e34c67"></path>
            <path d="M0 510L21.5 514C43 518 86 526 128.8 525.3C171.7 524.7 214.3 515.3 257.2 508.8C300 502.3 343 498.7 385.8 497.7C428.7 496.7 471.3 498.3 514.2 502.8C557 507.3 600 514.7 642.8 512.3C685.7 510 728.3 498 771.2 497.7C814 497.3 857 508.7 878.5 514.3L900 520L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z" fill="#d53867"></path>
            <path d="M0 528L21.5 532.2C43 536.3 86 544.7 128.8 545.5C171.7 546.3 214.3 539.7 257.2 540.7C300 541.7 343 550.3 385.8 550.8C428.7 551.3 471.3 543.7 514.2 538.8C557 534 600 532 642.8 534.8C685.7 537.7 728.3 545.3 771.2 550C814 554.7 857 556.3 878.5 557.2L900 558L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z" fill="#c62368"></path>
          </motion.g>
        </motion.svg>
      </div>
    </div>
  );
};

export default Homep;
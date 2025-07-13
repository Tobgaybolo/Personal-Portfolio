import React from 'react'
import Head from 'next/head'
import AnimatedText from '@/components/AnimatedText'
import Layout from '@/components/Layout'
import profilePic from '../../public/images/profile/profile.png'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import TransitionEffect from '@/components/TransitionEffect'

const AnimatedNumbers = ({ value }) => { 
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 3000 });
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            if (latest.toFixed(0) <= value) {
                setDisplayValue(Number(latest.toFixed(0)));
            }
        });
        return () => unsubscribe();
    }, [springValue, value]);

    return (
        <span ref={ref} className='inline-block text-6xl font-bold'>
            {displayValue.toString().padStart(2, '0')}
        </span>
    );
}

const About = () => {
  return (
    <>
        <Head>
            <title>Bolo | About Page</title>
            <meta name="description" content="anything" />
        </Head>
        <TransitionEffect />
        <main className='flex w-full flex-col items-center justify-center dark:text-light'>
            <Layout className='pt-16'>
                <AnimatedText text="Passion Fuels Purpose!" className='mb-16 lg:!text-7xl sm:!text6xl xs:!text-4xl sm:mb-8'/>
                <div className='grid w-full grid-cols-8 gap-16 sm:gap-8'>
                    <div className='col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8'>
                        <h2 className='mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75'>Biography</h2>
                        <p className='font-medium'>
                            Hi, I&apos;m Kinley Tobgay Lhendrup, a web developer and UI/UX designer student with a passion for creating beautiful, functional, 
                            and user-centered digital experiences. With almost 2 years of studying, I am always looking for 
                            new and innovative ways to bring my clients&apos; visions to life.
                        </p>

                        <p className='my-4 font-medium'>
                            I believe that design is about more than just making things look pretty &ndash; it&apos;s about solving problems and 
                            creating intuitive, enjoyable experiences for users. 
                        </p>

                        <p className='font-medium'>
                            Whether I&apos;m working on a website, mobile app, or 
                            other digital product, I bring my commitment to design excellence and user-centered thinking to 
                            every project I work on. I look forward to the opportunity to bring my skills and passion to your next project.
                        </p>
                    </div>
                    <div className='col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark
                     bg-light p-8 dark:bg-dark dark:border-light xl:col-span-4 md:order-1 md:col-span-8'>
                        <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light' />
                        <Image 
                            src={profilePic} 
                            alt="Bolo" 
                            className='w-full h-auto rounded-2xl'
                            priority
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        />
                    </div>
                    <div className='col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3'>
                        <div className='flex flex-col items-end justify-center xl:items-center'>
                            <span className='inline-block text-6xl font-bold md:text-6xl sm:text-5xl xm:text-4xl'>
                                <AnimatedNumbers value={50} />+
                            </span>
                            <h2 className='text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm'>
                                satisfied clients
                            </h2>
                        </div>
                        <div className='flex flex-col items-end justify-center xl:items-center'>
                            <span className='inline-block text-6xl font-bold md:text-6xl sm:text-5xl xm:text-4xl'>
                                <AnimatedNumbers value={40} />+
                            </span>
                            <h2 className='text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm'>
                                projects completed
                            </h2>
                        </div>
                        <div className='flex flex-col items-end justify-center xl:items-center'>
                            <span className='inline-block text-6xl font-bold md:text-6xl sm:text-5xl xm:text-4xl'>
                                <AnimatedNumbers value={2} />+
                            </span>
                            <h2 className='text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm'>
                                experience
                            </h2>
                        </div>
                    </div>
                </div>

                <Skills />
                <Education />
                <Experience />
            </Layout>
        </main>
    </>
  )
}

export default About
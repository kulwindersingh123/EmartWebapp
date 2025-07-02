import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import { motion } from 'framer-motion'

const sectionVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
}

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Category List */}
      <motion.div
        custom={0}
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        className="mb-6"
      >
        <CategoryList />
      </motion.div>

      {/* Banner */}
      <motion.div
        custom={1}
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <BannerProduct />
      </motion.div>

      {/* Horizontal Section */}
      <motion.div
        custom={2}
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <HorizontalCardProduct category="airpodes" heading="Top's Airpodes" />
      </motion.div>

      <motion.div
        custom={3}
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        className="mb-10"
      >
        <HorizontalCardProduct category="watches" heading="Popular's Watches" />
      </motion.div>

      {/* Vertical Sections */}
      <div className="grid gap-12">
        {[
          { category: 'mobiles', heading: 'Mobiles' },
          { category: 'Mouse', heading: 'Mouse' },
          { category: 'televisions', heading: 'Televisions' },
          { category: 'camera', heading: 'Camera & Photography' },
          { category: 'earphones', heading: 'Wired Earphones' },
          { category: 'speakers', heading: 'Bluetooth Speakers' },
          { category: 'refrigerator', heading: 'Refrigerator' },
          { category: 'trimmers', heading: 'Trimmers' },
        ].map((section, index) => (
          <motion.div
            key={section.category}
            custom={4 + index}
            variants={sectionVariant}
            initial="hidden"
            animate="visible"
          >
            <VerticalCardProduct
              category={section.category}
              heading={section.heading}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Home

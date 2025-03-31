import React, { lazy, Suspense, useEffect } from 'react'
const Footer = lazy(()=>import("./Shared/Footer"));
const CDherosection=lazy(()=>import("./Director/CDherosection"));
const AnimatedTestimonialsDemo=lazy(()=>import ('./Design-UI/AnimatedTestimonialsDemo'));
const TabsDemo =lazy(()=>import('./Design-UI/TabsDemo'));

const CDhome = () => {
  return (
    <div className="bg-[var(--main-bg)]">
      <Suspense fallback={<div className="text-white text-center py-10">Loading...</div>}>
      <CDherosection />
      <AnimatedTestimonialsDemo />
      <TabsDemo />
      <Footer />
      </Suspense>

    </div>
  )
}

export default CDhome
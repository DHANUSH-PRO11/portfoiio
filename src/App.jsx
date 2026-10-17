import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { Projects } from './pages/Projects/Projects';
import { ProjectDetails } from './pages/ProjectDetails/ProjectDetails';
import { Skills } from './pages/Skills/Skills';
import { Achievements } from './pages/Achievements/Achievements';
import { Contact } from './pages/Contact/Contact';
import { NotFound } from './pages/NotFound/NotFound';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetails />} />
        <Route path="skills" element={<Skills />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

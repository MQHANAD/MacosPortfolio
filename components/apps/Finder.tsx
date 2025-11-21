import React, { useState } from 'react';
import { User, Briefcase, FileText, Download } from 'lucide-react';
import { portfolioData } from '../../data/portfolio';

type Tab = 'about' | 'experience' | 'documents';

export default function FinderApp() {
  const [activeTab, setActiveTab] = useState<Tab>('about');

  return (
    <div className="flex h-full font-sans">
      {/* Sidebar */}
      <div className="w-48 bg-gray-100/80 backdrop-blur-md border-r border-gray-200 p-4 flex flex-col gap-1 text-sm text-gray-600 select-none">
         <div className="text-xs font-semibold text-gray-400 mb-2 px-2">Favorites</div>
         
         <button 
           onClick={() => setActiveTab('about')}
           className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer w-full text-left ${activeTab === 'about' ? 'bg-gray-300/50' : 'hover:bg-gray-200/50'}`}
         >
           <User size={16} className="text-blue-500" /> 
           <span>About</span>
         </button>
         
         <button 
           onClick={() => setActiveTab('experience')}
           className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer w-full text-left ${activeTab === 'experience' ? 'bg-gray-300/50' : 'hover:bg-gray-200/50'}`}
         >
           <Briefcase size={16} className="text-blue-500" /> 
           <span>Experience</span>
         </button>

         <button 
           onClick={() => setActiveTab('documents')}
           className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer w-full text-left ${activeTab === 'documents' ? 'bg-gray-300/50' : 'hover:bg-gray-200/50'}`}
         >
           <FileText size={16} className="text-blue-500" /> 
           <span>Documents</span>
         </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto bg-white text-gray-800">
        <div className="max-w-2xl mx-auto">
          
          {activeTab === 'about' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex flex-col items-center mb-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={portfolioData.personal.profileImage} 
                  alt={portfolioData.personal.name} 
                  className="w-32 h-32 rounded-full object-cover shadow-lg mb-4"
                />
                <h1 className="text-3xl font-bold text-gray-900">{portfolioData.personal.name}</h1>
                <p className="text-lg text-gray-500">{portfolioData.personal.role}</p>
              </div>
              
              <section>
                <h2 className="text-xl font-semibold mb-2 border-b pb-2">About Me</h2>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {portfolioData.personal.about}
                </p>
              </section>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
               <h2 className="text-2xl font-bold mb-6 border-b pb-2">Experience</h2>
               <div className="space-y-8">
                 {portfolioData.experience.map((exp, i) => (
                   <div key={i} className="relative border-l-2 border-gray-200 pl-4 ml-2">
                     <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-200 border-2 border-white"></div>
                     <h3 className="font-semibold text-xl">{exp.role}</h3>
                     <div className="text-sm text-gray-500 font-medium mb-2">{exp.company} | {exp.date}</div>
                     <p className="text-gray-600 mb-3">{exp.description}</p>
                     <div className="flex gap-2 flex-wrap">
                       {exp.tech.map(t => (
                         <span key={t} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium border border-gray-200">{t}</span>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
               <h2 className="text-2xl font-bold mb-6 border-b pb-2">Documents</h2>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-blue-50 cursor-pointer transition-colors group border border-transparent hover:border-blue-100">
                     <FileText size={48} className="text-gray-400 group-hover:text-blue-500 transition-colors" strokeWidth={1} />
                     <span className="text-sm text-center text-gray-600 group-hover:text-blue-700">Resume.pdf</span>
                  </div>
                  {/* Placeholder for other docs */}
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

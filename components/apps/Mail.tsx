import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Menu } from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import { useIsMobile } from "../../hooks/use-mobile";
import { cn } from "@/lib/utils";

export default function MailApp() {
    const isMobile = useIsMobile();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!isMobile) {
            setIsSidebarOpen(true);
        } else {
            setIsSidebarOpen(false);
        }
    }, [isMobile]);

    return (
        <div className="h-full flex flex-col sm:flex-row bg-white relative">
            {/* Mobile Toggle Button */}
            {isMobile && (
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute top-2 left-2 z-20 p-2 bg-gray-100 rounded-md shadow-sm"
                >
                    <Menu size={20} className="text-gray-600" />
                </button>
            )}

            {/* Sidebar */}
            <div
                className={cn(
                    "w-48 bg-gray-100 border-r border-gray-200 flex-col transition-all duration-300 ease-in-out absolute z-10 h-full sm:relative sm:translate-x-0",
                    isSidebarOpen ? "translate-x-0 shadow-xl sm:shadow-none" : "-translate-x-full sm:translate-x-0",
                    // On mobile, if open, it covers part of the screen. 
                    // We use absolute positioning on mobile to overlay.
                )}
            >
                <div className="p-2 text-gray-500 font-semibold text-xs uppercase mt-12 sm:mt-2">
                    Mailboxes
                </div>
                <div className="px-4 py-1 bg-blue-500 text-white text-sm rounded mx-2 flex justify-between">
                    <span>Inbox</span>
                    <span>1</span>
                </div>
                <div className="px-4 py-1 text-gray-700 text-sm mx-2 flex justify-between hover:bg-gray-200 rounded cursor-pointer">
                    <span>Sent</span>
                </div>
                <div className="px-4 py-1 text-gray-700 text-sm mx-2 flex justify-between hover:bg-gray-200 rounded cursor-pointer">
                    <span>Drafts</span>
                </div>
            </div>

            {/* Email List */}
            <div className="hidden sm:flex w-full sm:w-64 border-b sm:border-b-0 sm:border-r border-gray-200 flex-col bg-white shrink-0">
                <div className="p-3 border-b border-gray-100 bg-blue-50/50 cursor-pointer pt-12 sm:pt-3">
                    <div className="flex justify-between mb-1">
                        <span className="font-bold text-sm text-gray-900">
                            Muhannad
                        </span>
                        <span className="text-xs text-gray-400">Now</span>
                    </div>
                    <div className="text-xs font-medium text-gray-700 mb-1">
                        Let's Connect!
                    </div>
                    <div className="text-xs text-gray-500 line-clamp-2">
                        Hi there! I'm always open to discussing new projects...
                    </div>
                </div>
            </div>

            {/* Email Content */}
            <div className="flex-1 p-4 sm:p-8 overflow-y-auto sm:pt-8 pt-16">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Let's Connect!
                    </h2>
                    <div className="flex items-center gap-3 mb-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={portfolioData.personal.profileImage}
                            className="w-10 h-10 rounded-full object-cover"
                            alt="Avatar"
                        />
                        <div>
                            <div className="font-bold text-sm">Muhannad Alduraywish</div>
                            <div className="text-xs text-gray-500">
                                To: You &lt;visitor@portfolio.com&gt;
                            </div>
                        </div>
                    </div>
                </div>

                <div className="prose prose-sm max-w-none text-gray-700">
                    <p>Hi there,</p>
                    <p>
                        Feel free to reach out to me for any questions or opportunities.
                        I am always open to discussing new projects, creative ideas or
                        opportunities to be part of your vision.
                    </p>

                    <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail size={18} className="text-gray-400" />
                            <a
                                href={`mailto:${portfolioData.personal.email}`}
                                className="text-blue-600 hover:underline"
                            >
                                {portfolioData.personal.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone size={18} className="text-gray-400" />
                            <a
                                href={`tel:${portfolioData.personal.phone}`}
                                className="text-blue-600 hover:underline"
                            >
                                {portfolioData.personal.phone}
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin size={18} className="text-gray-400" />
                            <span>{portfolioData.personal.location}</span>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <a
                            href={portfolioData.personal.social.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            <Github size={20} className="text-gray-700" />
                        </a>
                        <a
                            href={portfolioData.personal.social.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            <Linkedin size={20} className="text-gray-700" />
                        </a>
                        <a
                            href={portfolioData.personal.social.x}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            <Twitter size={20} className="text-gray-700" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

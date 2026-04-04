import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { personalData } from '../../constants/data';
import { IconButton } from '../ui/Button';

export default function TerminalOverlay() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', text: 'JASKARAN_OS v2.0.42 (Secure Kernel)' },
        { type: 'system', text: 'Type "help" to see available commands.' }
    ]);
    const endRef = useRef(null);
    const inputRef = useRef(null);

    // Keyboard shortcut listener to toggle terminal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === '`') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Scroll to bottom and focus when history changes
    useEffect(() => {
        if (isOpen) {
            endRef.current?.scrollIntoView({ behavior: 'smooth' });
            inputRef.current?.focus();
        }
    }, [history, isOpen]);

    const PWD = 'visitor@jaskaran-os:~$';

    const handleCommand = (cmd) => {
        const trimmed = cmd.trim().toLowerCase();
        
        let response = [];
        switch (trimmed) {
            case 'help':
                response = [
                    'Available commands:',
                     '  whoami     - Display core identity',
                     '  skills     - List technical competencies',
                     '  contact    - Print contact information',
                     '  clear      - Clear terminal output',
                     '  exit       - Close terminal proxy'
                ];
                break;
            case 'whoami':
                response = [
                    personalData.name,
                    'Roles: ' + personalData.roles.join(' | ')
                ];
                break;
            case 'skills':
                response = personalData.skills.map(skillSet => 
                    `[${skillSet.title.toUpperCase()}] ${skillSet.items.map(s => s.name).join(', ')}`
                );
                break;
            case 'contact':
                response = [
                    `Email:    ${personalData.contact.email}`,
                    `LinkedIn: ${personalData.contact.linkedin}`,
                    `GitHub:   ${personalData.contact.github}`
                ];
                break;
            case 'sudo':
                response = ['nice try. this incident will be reported.'];
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            case 'exit':
                setIsOpen(false);
                setInput('');
                return;
            case '':
                break;
            default:
                response = [`command not found: ${trimmed}`];
        }

        const newHistory = [...history, { type: 'command', text: `${PWD} ${cmd}` }];
        response.forEach(r => newHistory.push({ type: 'output', text: r }));
        
        setHistory(newHistory);
        setInput('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCommand(input);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    className="fixed inset-4 md:inset-x-[15%] md:inset-y-[20%] z-[200] flex flex-col font-mono text-sm shadow-2xl overflow-hidden rounded-lg border border-neon/50 bg-dark/95 backdrop-blur-xl"
                >
                    {/* Header */}
                    <div className="bg-[#0b1120] border-b border-white/10 px-4 py-2 flex items-center justify-between shadow-md">
                        <div className="flex items-center gap-2 text-white/50">
                            <TerminalIcon size={14} />
                            <span>vapt-shell proxy ~ {PWD}</span>
                        </div>
                        <IconButton
                            onClick={() => setIsOpen(false)}
                            className="!min-h-8 !min-w-8 !p-1 !bg-transparent !border-0 !shadow-none text-white/50 hover:!text-red-400"
                            aria-label="Close terminal"
                        >
                            <X size={16} />
                        </IconButton>
                    </div>

                    {/* Terminal Body */}
                    <div 
                        className="flex-1 p-4 overflow-y-auto scrollbar-thin cursor-text"
                        onClick={() => inputRef.current?.focus()}
                    >
                        <div className="space-y-1.5 pb-2">
                            {history.map((line, i) => (
                                <div key={i} className={`
                                    ${line.type === 'system' ? 'text-white/60 font-bold' : ''}
                                    ${line.type === 'command' ? 'text-neon' : ''}
                                    ${line.type === 'output' ? 'text-[var(--color-purple)]' : ''}
                                `} style={{ '--color-purple': '#a855f7' }}>
                                    {line.text}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
                            <span className="text-neon shrink-0">{PWD}</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-transparent border-none text-white focus:outline-none w-full shadow-none appearance-none"
                                autoFocus
                                spellCheck="false"
                                autoComplete="off"
                            />
                        </form>
                        <div ref={endRef} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

import { useState, useEffect, useRef } from 'react';

/**
 * TypingText - A terminal-style typing animation component
 * 
 * Features:
 * - Character-by-character reveal
 * - Blinking cursor during typing
 * - Cursor fades after typing completes
 * - No layout shift (uses invisible placeholder)
 * - Customizable typing speed
 */
export default function TypingText({
    text,
    delay = 0,
    typingSpeed = 50,
    className = '',
    cursorClassName = 'text-neon',
    onComplete,
    showCursor = true,
    as: Component = 'span',
}) {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const indexRef = useRef(0);

    useEffect(() => {
        // Initial delay before starting
        const startTimer = setTimeout(() => {
            setHasStarted(true);
            setIsTyping(true);
        }, delay);

        return () => clearTimeout(startTimer);
    }, [delay]);

    useEffect(() => {
        if (!hasStarted || !isTyping) return;

        if (indexRef.current < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(text.slice(0, indexRef.current + 1));
                indexRef.current += 1;
            }, typingSpeed);

            return () => clearTimeout(timer);
        } else {
            setIsTyping(false);
            setIsComplete(true);
            onComplete?.();
        }
    }, [hasStarted, isTyping, displayedText, text, typingSpeed, onComplete]);

    return (
        <Component className={`relative ${className}`}>
            {/* Invisible placeholder to prevent layout shift */}
            <span className="invisible" aria-hidden="true">{text}</span>

            {/* Actual typed text overlay */}
            <span className="absolute inset-0">
                {displayedText}
                {/* Blinking cursor */}
                {showCursor && (
                    <span
                        className={`inline-block ml-0.5 font-normal ${cursorClassName} ${isComplete ? 'animate-pulse opacity-0' : 'animate-pulse'
                            }`}
                        style={{
                            animation: isComplete
                                ? 'fadeOut 0.5s ease forwards'
                                : 'blink 0.8s step-end infinite',
                        }}
                    >
                        |
                    </span>
                )}
            </span>
        </Component>
    );
}

/**
 * TypingSequence - Animates multiple lines in sequence
 */
export function TypingSequence({
    lines,
    onAllComplete,
    delayBetweenLines = 300,
    startDelay = 500,
}) {
    const [currentLine, setCurrentLine] = useState(0);
    const [completedLines, setCompletedLines] = useState([]);

    const handleLineComplete = (index) => {
        setCompletedLines(prev => [...prev, index]);

        if (index < lines.length - 1) {
            setTimeout(() => {
                setCurrentLine(index + 1);
            }, delayBetweenLines);
        } else {
            onAllComplete?.();
        }
    };

    return (
        <>
            {lines.map((line, index) => (
                <div key={index} className={line.wrapperClassName || ''}>
                    {index <= currentLine ? (
                        <TypingText
                            text={line.text}
                            delay={index === 0 ? startDelay : 0}
                            typingSpeed={line.speed || 50}
                            className={line.className}
                            cursorClassName={line.cursorClassName}
                            showCursor={index === currentLine}
                            onComplete={() => handleLineComplete(index)}
                            as={line.as || 'span'}
                        />
                    ) : (
                        // Placeholder for lines not yet typed
                        <span className={`${line.className} invisible`}>
                            {line.text}
                        </span>
                    )}
                </div>
            ))}
        </>
    );
}

"use client"
import { useState } from 'react';

const CopyToClipboardButton = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);



    const handleCopy = async () => {
        try {

            const onlyQuestions = textToCopy.map((q, i) => {
                let questionText = `${i + 1}. ${q.question}`;
                if (q.options) {
                    const optionsText = q.options.map(opt => `   ${opt}`).join('\n');
                    questionText += `\n${optionsText}`;
                }
                return questionText;
            }).join('\n\n');

            await navigator.clipboard.writeText(onlyQuestions);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <button onClick={handleCopy} className='px-2 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-800 transition-all duration-200'>
            {copied ? 'Copied!' : 'Copy Questions'}
        </button>
    );
};

export default CopyToClipboardButton;
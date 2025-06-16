import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export function useSpeech() {
    const { i18n } = useTranslation();

    const speak = useCallback((text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = i18n.language === 'pt' ? 'pt-BR' : i18n.language;
            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);
        }
    }, []);

    return { speak };
}
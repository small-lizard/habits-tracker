import { useSelector, useDispatch } from "react-redux";
import { WeekStartOptions } from "../../components/enumWeekStartOpthions";
import { RootState, AppDispatch } from "../../store/store";
import * as settingsActions from '../../store/settingsSlice';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import './settings.css';

export function Settings() {
    const uiWeekStart = useSelector((state: RootState) => state.settings.uiWeekStart);
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();

    const setLang = (lang: 'ru' | 'en') => {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang);
    };
2
    const getCurrentLanguage = () => i18n.language;

    return (
        <div>
            <h1>{t('common.settings')}</h1>
            <div className="settings-container">
                <div className="first-day-container">
                    <h3 className="settings-title">{t('titles.firstDaySetting')}</h3>
                    <div className="radio-btn-container">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="weekStart"
                                value="mon"
                                checked={uiWeekStart === 'monday'}
                                onChange={() =>
                                    dispatch(settingsActions.setWeekStart(WeekStartOptions.Monday))
                                }
                            />
                            <span className="checkmark"></span>
                            {t('titles.mon')}
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="weekStart"
                                value="sun"
                                checked={uiWeekStart === 'sunday'}
                                onChange={() =>
                                    dispatch(settingsActions.setWeekStart(WeekStartOptions.Sunday))
                                }
                            />
                            <span className="checkmark"></span>
                            {t('titles.sun')}
                        </label>
                    </div>
                </div>
                <div className="language">
                    <h3 className="settings-title">{t('titles.lang')}</h3>
                    <div className="radio-btn-container">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="lang"
                                value="ru"
                                checked={getCurrentLanguage() === 'ru'}
                                onChange={() =>
                                    setLang('ru')
                                }
                            />
                            <span className="checkmark"></span>
                            {t('titles.ru')}
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="lang"
                                value="en"
                                checked={getCurrentLanguage() === 'en'}
                                onChange={() =>
                                    setLang('en')
                                }
                            />
                            <span className="checkmark"></span>
                            {t('titles.en')}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )

}
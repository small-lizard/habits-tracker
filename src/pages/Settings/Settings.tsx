import { useSelector, useDispatch } from "react-redux";
import { WeekStartOptions } from "../../components/enumWeekStartOpthions";
import { RootState, AppDispatch } from "../../store/store";
import * as settingsActions from '../../store/settingsSlice';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

export function Settings() {
    const uiWeekStart = useSelector((state: RootState) => state.settings.uiWeekStart);
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();

    const setLang = (lang: 'ru' | 'en') => {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang);
    };

    const getCurrentLanguage = () => i18n.language;

    return (
        <div>
            <h2>{t('common.settings')}</h2>
            <div>
                <div className="first-day-container">
                    <p>{t('titles.firstDaySetting')}</p>
                    <label>
                        <input
                            type="radio"
                            name="weekStart"
                            className='radio'
                            value="sun"
                            checked={uiWeekStart === 'sunday'}
                            onChange={() =>
                                dispatch(settingsActions.setWeekStart(WeekStartOptions.Sunday))
                            }
                        />
                        {t('titles.sun')}
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="weekStart"
                            className='radio'
                            value="mon"
                            checked={uiWeekStart === 'monday'}
                            onChange={() =>
                                dispatch(settingsActions.setWeekStart(WeekStartOptions.Monday))
                            }
                        />
                        {t('titles.mon')}
                    </label>
                </div>
                <div className="language">
                    <p>{t('titles.lang')}</p>
                    <label>
                        <input
                            type="radio"
                            name="lang"
                            className='radio'
                            value="en"
                            checked={getCurrentLanguage() === 'en'}
                            onChange={() =>
                                setLang('en')
                            }
                        />
                        {t('titles.en')}
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="lang"
                            className='radio'
                            value="ru"
                            checked={getCurrentLanguage() === 'ru'}
                            onChange={() =>
                                setLang('ru')
                            }
                        />
                        {t('titles.ru')}
                    </label>
                </div>
            </div>
        </div>
    )

}
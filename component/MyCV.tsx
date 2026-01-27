// MyCV.tsx
import './MyCV.css';
import { type ResumeData } from '../interfaces/resumeData';
import { useState } from 'react';

// Импортируем иконки (установите react-icons: npm install react-icons)
import { FaPhone, FaWhatsapp, FaTelegram, FaEnvelope, FaFileDownload } from 'react-icons/fa';

import { SiViber } from 'react-icons/si';

import { IconContext } from "react-icons";

import profilePhoto from '../src/photo/photo.jpg';
import profilePDF from '../files/Резюме_Д.В.Булатов.pdf';
import React from 'react';

interface MyCVProps {
  data: ResumeData;
}

function MyCV({ data }: MyCVProps) {
  const { resume } = data;
  const { docName, personalInfo, education, workExperience, trainings, additionalInfo } = resume;
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);

  // Функции для обработки кликов
  const handlePhoneClick = () => {
    setShowPhoneMenu(!showPhoneMenu);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '+905331458481';
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  const handleTelegramClick = () => {
    const username = 'bulati4'; // Замените на ваш username
    window.open(`https://t.me/${username}`, '_blank');
  };

  const handleViberClick = () => {
    const phoneNumber = '+905331458481';
    window.open(`viber://chat?number=${phoneNumber}`, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:bulati4@mail.ru';
  };

  const handleCall = (method: string) => {
    const phoneNumber = '+905331458481';
    switch (method) {
      case 'mobile':
        window.open(`tel:${phoneNumber}`);
        break;
      case 'skype':
        window.open(`skype:${phoneNumber}?call`);
        break;
      case 'facetime':
        window.open(`facetime:${phoneNumber}`);
        break;
      case 'viber-out':
        window.open(`viber://calls?number=${phoneNumber}`);
        break;
    }
    setShowPhoneMenu(false);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = profilePDF;
    link.download = 'Резюме_Д.В.Булатов.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  React.useEffect(() => {
    const handleClickOutside = () => {
      if (showPhoneMenu) {
        setShowPhoneMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showPhoneMenu]);


return (
    <div className="cv-container">
      <div className="cv-grid">
        <div className="doc-name">{docName}</div>
        
        <div className="cv-card personal-section">
          <div className="profile-header">
            <div className="profile-photo-container">
              <img 
                src={profilePhoto} 
                alt={personalInfo.fullName}
                className="profile-photo"
              />
              <div className="photo-badge">Доступен для работы</div>
            </div>
            
            <div className="profile-info">
              <h1 className="full-name">{personalInfo.fullName}</h1>
              <div className="profile-title">Специалист по управлению проектами АЭС</div>
              
              <div className="personal-details-grid">
                <div className="personal-detail-item">
                  <strong>Дата рождения</strong>
                  <span>{personalInfo.birthDate}</span>
                </div>
                <div className="personal-detail-item">
                  <strong>Семейное положение</strong>
                  <span>{personalInfo.maritalStatus}</span>
                </div>
                <div className="personal-detail-item">
                  <strong>Проживание</strong>
                  <span>{personalInfo.location}</span>
                </div>
                <div className="personal-detail-item">
                  <strong>Статус</strong>
                  <span className="status-available">Ищу новые возможности</span>
                </div>
              </div>
            </div>
          </div>

          <div className="download-section">
            <button className="download-btn" onClick={handleDownloadCV}>
              <FaFileDownload /> Скачать резюме
            </button>
          </div>

          <div className="contacts-grid">
            <div className="contact-item phone-item" onClick={handlePhoneClick}>
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div className="contact-content">
                <strong>Тел.</strong>
                <span>+90 (533) 145-84-81</span>
                <span className="contact-hint">Нажмите для выбора способа звонка</span>
              </div>
              {showPhoneMenu && (
                <div className="phone-menu">
                  <div className="phone-menu-item" onClick={() => handleCall('mobile')}>
                    <FaPhone /> Позвонить с телефона
                  </div>
                  <div className="phone-menu-item" onClick={() => handleCall('skype')}>
                    <FaPhone /> Позвонить через Skype
                  </div>
                  <div className="phone-menu-item" onClick={() => handleCall('facetime')}>
                    <FaPhone /> Позвонить через FaceTime
                  </div>
                  <div className="phone-menu-item" onClick={() => handleCall('viber-out')}>
                    <SiViber /> Позвонить через Viber Out
                  </div>
                </div>
              )}
            </div>

            <div className="contact-item" onClick={handleWhatsAppClick}>
              <div className="contact-icon whatsapp">
                <IconContext.Provider 
                  value={{ 
                    color: "#25D366", 
                    className: "global-class-name",
                    size: "2.5em"
                  }}>
                  <div>
                    <FaWhatsapp />
                  </div>
                </IconContext.Provider>;
              </div>
              <div className="contact-content">
                <strong>WhatsApp</strong>
                <span>+90 (533) 145-84-81</span>
                <span className="contact-hint">Открыть в WhatsApp</span>
              </div>
            </div>



            <div className="contact-item" onClick={handleTelegramClick}>
              <div className="contact-icon telegram">
                <IconContext.Provider 
                  value={{ 
                    color: "#0088cc",
                    className: "global-class-name",
                    size: "2.5em"
                  }}>
                  <div>
                    <FaTelegram />
                  </div>
                </IconContext.Provider>;
              </div>
              
              <div className="contact-content">
                <strong>Telegram</strong>
                <span>@bulati4</span>
                <span className="contact-hint">Открыть в Telegram</span>
              </div>
            </div>

            <div className="contact-item" onClick={handleViberClick}>
              <div className="contact-icon viber">

                <IconContext.Provider 
                  value={{ 
                    color: "#7360F2",
                    className: "global-class-name",
                    size: "2.5em"
                  }}>
                  <div>
                    <SiViber />
                  </div>
                </IconContext.Provider>;



              </div>
              <div className="contact-content">
                <strong>Viber</strong>
                <span>+90 (533) 145-84-81</span>
                <span className="contact-hint">Открыть в Viber</span>
              </div>
            </div>

            <div className="contact-item" onClick={handleEmailClick}>
              <div className="contact-icon email">
                <IconContext.Provider 
                  value={{ 
                    color: "#EA4335",
                    className: "global-class-name",
                    size: "2.5em"
                  }}>
                  <div>
                    <FaEnvelope />
                  </div>
                </IconContext.Provider>;
              </div>
              <div className="contact-content">
                <strong>E-mail</strong>
                <span>bulati4@mail.ru</span>
                <span className="contact-hint">Написать письмо</span>
              </div>
            </div>
          </div>
        </div>

        <div className="cv-card">
          <h2 className="section-title">Образование</h2>
          <div className="education-grid">
            {education.map((edu, idx) => (
              <div key={idx} className="education-item">
                <div className="education-period">{edu.period}</div>
                <div className="education-content">
                  <h3>{edu.institution}</h3>
                  <div className="education-details">
                    {edu.details.program && <p>{edu.details.program}</p>}
                    {edu.details.specialty && <p><strong>Специальность:</strong> {edu.details.specialty}</p>}
                    {edu.details.specialization && <p><strong>Специализация:</strong> {edu.details.specialization}</p>}
                    <p><strong>Квалификация:</strong> {edu.details.qualification}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cv-card">
          <h2 className="section-title">Опыт работы</h2>
          <div className="experience-grid">
            {workExperience.map((exp, idx) => (
              <div key={idx} className="experience-item">
                <div className="experience-header">
                  <div className="experience-period">{exp.period}</div>
                  <div className="experience-company">{exp.company}, {exp.location}</div>
                </div>
                <div className="experience-position">{exp.position}</div>
                <div className="responsibilities-grid">
                  {exp.responsibilities.map((resp, i) => (
                    <div key={i} className="responsibility-item">{resp}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cv-card">
          <h2 className="section-title">Тренинги, семинары, курсы</h2>
          <div className="trainings-grid">
            {trainings.map((training, idx) => (
              <div key={idx} className="training-item">
                <div className="training-date">{training.date}</div>
                <div className="training-name">{training.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cv-card">
          <h2 className="section-title">Дополнительные сведения</h2>
          <div className="additional-info-grid">
            <div className="info-section">
              <h3>Навыки</h3>
              <div className="skills-grid">
                {additionalInfo.skills.map((skill, idx) => (
                  <div key={idx} className="skill-item">{skill}</div>
                ))}
              </div>
            </div>
            
            <div className="info-section">
              <h3>Достижения</h3>
              <div className="skills-grid">
                {additionalInfo.achievements.map((achievement, idx) => (
                  <div key={idx} className="skill-item">{achievement}</div>
                ))}
              </div>
            </div>
            
            <div className="info-section">
              <h3>Языки</h3>
              {additionalInfo.languages.map((lang, idx) => (
                <div key={idx} className="language-item">
                  <span className="language-name">{lang.language}</span>
                  <span className="language-level">{lang.level}</span>
                </div>
              ))}
            </div>
            
            <div className="info-section">
              <h3>Личные качества</h3>
              <div className="qualities-grid">
                {additionalInfo.personalQualities.map((quality, idx) => (
                  <div key={idx} className="quality-item">{quality}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCV;
import './MyCV.css';
import { type ResumeData } from '../interfaces/resumeData';
import { useState, useEffect } from 'react';

// Импортируем иконки
import { FaPhone, FaWhatsapp, FaTelegram, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import { IconContext } from "react-icons";

import profilePhoto from '../src/photo/photo.jpg';
import profilePDF from '../files/Резюме_Д.В.Булатов.pdf';

interface MyCVProps {
  data: ResumeData;
}

function MyCV({ data }: MyCVProps) {
  const { resume } = data;
  const { docName, personalInfo, education, workExperience, trainings, additionalInfo } = resume;
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);

  // Контактные данные из personalInfo
  const phoneNumber = personalInfo.contacts.find(c => c.type === "Тел.")?.value.replace(/[^\d+]/g, '') || '+79162878906';
  const whatsappNumber = personalInfo.contacts.find(c => c.type === "WhatsApp")?.value.replace(/[^\d+]/g, '') || '+79162878906';
  const telegramValue = personalInfo.contacts.find(c => c.type === "Telegramm")?.value || '@SummerSunny20100';
  const emailValue = personalInfo.contacts.find(c => c.type === "E-mail")?.value || 'bulati4@mail.ru';

  // Функции для обработки кликов
  const handlePhoneClick = () => {
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      navigator.clipboard.writeText(phoneNumber);
      alert('Номер скопирован в буфер обмена');
    }
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };


  const handleTelegramClick = () => {
    const telegramUsername = telegramValue.replace('@', '');
    window.open(`https://t.me/${telegramUsername}`, '_blank');
  };

  const handleMaxClick = () => {
    const maxUsername = "f9LHodD0cOLjrVBcENU48cwN53hrMd773vOx94bpUY8V5kqZlT7Hl7EauOo";
    window.open(`https://max.ru/u/${maxUsername}`, '_blank');
  };

const handleEmailClick = () => {
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.location.href = `mailto:${emailValue}`;
  } else {
    const mailtoLink = document.createElement('a');
    mailtoLink.href = `mailto:${emailValue}`;
    mailtoLink.click();
    setTimeout(() => {
      navigator.clipboard.writeText(emailValue);
      alert('Email скопирован в буфер обмена (почтовый клиент не открылся)');
    }, 500);
  }
};

  const handleCall = (method: string) => {
    if (method === 'mobile') {
      window.open(`tel:${phoneNumber}`);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.phone-item')) {
        setShowPhoneMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
                <span>{personalInfo.contacts.find(c => c.type === "Тел.")?.value}</span>
                <span className="contact-hint">
                  {/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) 
                    ? 'Позвонить' 
                    : 'Копировать номер'}
                </span>
              </div>
              {showPhoneMenu && (
                <div className="phone-menu" onClick={(e) => e.stopPropagation()}>
                  <div className="phone-menu-item" onClick={() => handleCall('mobile')}>
                    <FaPhone /> Позвонить с телефона
                  </div>
                </div>
              )}
            </div>

            <div className="contact-item" onClick={handleWhatsAppClick}>
              <div className="contact-icon whatsapp">
                <IconContext.Provider value={{ color: "#25D366", size: "2.5em" }}>
                  <FaWhatsapp />
                </IconContext.Provider>
              </div>
              <div className="contact-content">
                <strong>WhatsApp</strong>
                <span>{personalInfo.contacts.find(c => c.type === "WhatsApp")?.value}</span>
                <span className="contact-hint">Открыть в WhatsApp</span>
              </div>
            </div>

            <div className="contact-item" onClick={handleTelegramClick}>
              <div className="contact-icon telegram">
                <IconContext.Provider value={{ color: "#0088cc", size: "2.5em" }}>
                  <FaTelegram />
                </IconContext.Provider>
              </div>
              <div className="contact-content">
                <strong>Telegram</strong>
                <span>{personalInfo.contacts.find(c => c.type === "Telegramm")?.value}</span>
                <span className="contact-hint">Открыть в Telegram</span>
              </div>
            </div>

            <div className="contact-item" onClick={handleMaxClick}>
              <div 
                className="contact-icon max" 
                style={{
                  width: '2.5em',
                  height: '2.5em',
                  backgroundImage: 'url(https://logo-teka.com/wp-content/uploads/2025/07/max-messenger-sign-logo.svg)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
              />
              <div className="contact-content">
                <strong>MAX</strong>
                <span>{personalInfo.contacts.find(c => c.type === "MAX")?.value}</span>
                <span className="contact-hint">Открыть в MAX</span>
              </div>
            </div>

            <div className="contact-item" onClick={handleEmailClick}>
              <div className="contact-icon email">
                <IconContext.Provider value={{ color: "#EA4335", size: "2.5em" }}>
                  <FaEnvelope />
                </IconContext.Provider>
              </div>
              <div className="contact-content">
                <strong>E-mail</strong>
                <span>{personalInfo.contacts.find(c => c.type === "E-mail")?.value}</span>
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
                <ul className="responsibilities-grid">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="responsibility-item">{resp}</li>
                  ))}
                </ul>
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
                <div className="training-name">
                  {training.name}
                  {training.certificateUrl && (
                    <a 
                      href={training.certificateUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="certificate-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {training.certificateText || 'Сертификат'}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cv-card">
          <h2 className="section-title">Дополнительные сведения</h2>
          <div className="additional-info-grid">
            <div className="info-section">
              <h3>Навыки</h3>
              <ul className="skills-grid">
                {additionalInfo.skills.map((skill, idx) => (
                  <li key={idx} className="skill-item">{skill}</li>
                ))}
              </ul>
            </div>
            
            <div className="info-section">
              <h3>Достижения</h3>
              <ul className="skills-grid">
                {additionalInfo.achievements.map((achievement, idx) => (
                  <li key={idx} className="skill-item">{achievement}</li>
                ))}
              </ul>
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
              <ul className="qualities-grid">
                {additionalInfo.personalQualities.map((quality, idx) => (
                  <li key={idx} className="quality-item">{quality}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCV;
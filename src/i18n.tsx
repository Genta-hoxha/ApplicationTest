import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
      translation: {
        welcome: "Welcome",
        completedTasks: "Completed Tasks",
        noCompletedTasks: "No completed tasks found.",
        tags: "Tags",
        taskTitle: "Task Title", // Placeholder for dynamic task titles
        taskDescription: "Task Description", // Placeholder for dynamic descriptions
        // Add other keys here...
      },
    },
   
    it: {
      translation: {
        welcome: "Benvenuto",
        completedTasks: "Compiti Completati",
        noCompletedTasks: "Nessun compito completato trovato.",
        tags: "Tag",
        taskTitle: "Titolo del Compito",
        taskDescription: "Descrizione del Compito",
      },
    },
    sq: {
      translation: {
        welcome: "Mirë se vini",
        completedTasks: "Detyrat e përfunduara",
        noCompletedTasks: "Nuk u gjetën detyra të përfunduara.",
        tags: "Etiketat",
        taskTitle: "Titulli i detyrës",
        taskDescription: "Përshkrimi i detyrës",
      },
    },
  };
  
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;

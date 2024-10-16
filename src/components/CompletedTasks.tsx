

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Task } from '../../tasks';
// import { useTranslation } from 'react-i18next';
// interface CompletedTasksProps {
//   tasks: Task[];
// }

// const CompletedTasks: React.FC<CompletedTasksProps> = ({ tasks }) => {
//   const { t, i18n } = useTranslation();
//   const completedTasks = tasks.filter(task => task.completed);
//   const changeLanguage = (lng: string) => {
//     i18n.changeLanguage(lng);
//   };
//   return (
//     <div className="completed-tasks">
//        <div>
//       <h1>{t('welcome')}</h1>
//       <button onClick={() => changeLanguage('en')}>English</button>
//       <button onClick={() => changeLanguage('fr')}>French</button>
//     </div>
//       <h2>Completed Tasks</h2>
//       {completedTasks.length === 0 ? (
//         <p>No completed tasks found.</p>
//       ) : (
//         <div className='task-cards'>
//         {completedTasks.map(task => (
//           <div key={task.id} className="task-card">
//           <h3>{t(`task.title`)}</h3>
//             <p>{task.description}</p>
//             <p><span style={{fontSize: '20px', color: '#e350a8'}}>Tags:</span> {task.tags.join(', ')}</p>
//             <p><span style={{fontSize: '20px', color: '#9543a7'}}>Created on:</span> {new Date(task.creationDate).toLocaleDateString()}</p>
//           </div>
//         ))}
//         </div>
//         )}
//       <Link to="/">Go Back</Link>
//     </div>
//   );
// };

// export default CompletedTasks;


import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../../tasks';
import { useTranslation } from 'react-i18next';

interface CompletedTasksProps {
  tasks: Task[];
}

const CompletedTasks: React.FC<CompletedTasksProps> = ({ tasks }) => {
  const { t, i18n } = useTranslation();
  const completedTasks = tasks.filter(task => task.completed);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="completed-tasks">
      <div>
        <h1>{t('welcome')}</h1>
      </div>
      <h2>{t('completedTasks')}</h2>
      {completedTasks.length === 0 ? (
        <p>{t('noCompletedTasks')}</p>
      ) : (
        <div className='task-cards'>
          {completedTasks.map(task => (
            <div key={task.id} className="task-card">
              <h3>{t('taskTitle')}: {task.title}</h3> {/* Use translation for title */}
              <p>{t('taskDescription')}: {task.description}</p> {/* Use translation for description */}
              <p>
                <span style={{ fontSize: '20px', color: '#e350a8' }}>{t('tags')}:</span> {task.tags.join(', ')}
              </p>
              <p>
                <span style={{ fontSize: '20px', color: '#9543a7' }}>Created on:</span> {new Date(task.creationDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default CompletedTasks;



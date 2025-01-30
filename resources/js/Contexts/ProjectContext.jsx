import { createContext } from 'react';

export const ProjectContext = createContext();

export default function ProjectProvider({ project, pendingTasks, finishedTasks, children }) {

  return (
    <ProjectContext.Provider value={{ project, pendingTasks, finishedTasks }}>
      {children}
    </ProjectContext.Provider>
  );
}
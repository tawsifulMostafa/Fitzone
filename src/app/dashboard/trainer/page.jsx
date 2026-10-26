import React from 'react';
import TrainerClassesPage from './classes/page';
import { getUser } from '@/lib/core/session';

const TrainerDashboardPage = async() => {
    const user = await getUser()
    const role = user?.role
    const totalClassCreated = await TrainerClassesPage()
    console.log(totalClassCreated);
    return (
        <div>
          <div>
            {role}
          </div>
          <div>
            Total Class Created : <span>{totalClassCreated.length}</span>
          </div>
        </div>
    );
};

export default TrainerDashboardPage;

//!  todo : total overview of trainer dashboard

import StudentsTable from '@/components/admin/student/StudentsTable';
import React from 'react'

const Admin = () => {

  return (
    <div className="min-h-screen">

    {/* Content Section */}
    <div className="space-y-8">
      {/* StudentsTable is inside the table but properly structured */}
      <StudentsTable />
      {/* Managment Component */}
      {/* <ManagmentGrid /> */}
      {/* Statistics Based on CGPA */}
      {/* <CGPAPieChart /> Use the CGPA table component here */}
    </div>
  </div>
  )
}

export default Admin
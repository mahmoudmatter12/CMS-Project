import ManagmentGrid from '@/components/admin/ManagmentGrid';
import StudentsTable from '@/components/admin/student/StudentsTable';
import DepartmentMainComp from '@/components/Department/DepartmentMainComp';
import React from 'react'

const Admin = () => {

  return (
    <div className="min-h-screen">

    {/* Content Section */}
    <div className="space-y-8">
      {/* StudentsTable is inside the table but properly structured */}
      <StudentsTable />
      {/* Managment Component */}
      <ManagmentGrid />
      {/* Statistics Based on CGPA */}
      {/* <CGPAPieChart /> Use the CGPA table component here */}
      <DepartmentMainComp />
    </div>
  </div>
  )
}

export default Admin
interface Person {
    firstName: string;
    lastName: string;
    email: string;
}
interface Employee extends Person {
    readonly employeeId: string;
    department: string;
    startDate: Date;
}
interface Manager extends Employee {
    teamSize: number;
    directReports: string[];
}
function getFullName(person: Person): string {
    return `${person.firstName} ${person.lastName}`;
}
function introduceEmployee(employee: Employee): string {

    return `Hi, I am ${getFullName(employee)} from ${employee.department},
joined on ${employee.startDate.toLocaleDateString()}`;

}
// Employee and Manager inherit Person properties,
// therefore getFullName accepts all three types.
package net.javaguides.ems.service;

import net.javaguides.ems.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {

    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long id);

    List<EmployeeDto> getAllEmployee();

    EmployeeDto updateEmployee(Long id,EmployeeDto employeeDto);

    void deleteEmployee(Long id);
}

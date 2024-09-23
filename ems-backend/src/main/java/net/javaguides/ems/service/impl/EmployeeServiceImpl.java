package net.javaguides.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.entity.Employee;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.EmployeeMapper;
import net.javaguides.ems.repository.EmployeeRepository;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service

public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;


    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.maptoEmployee(employeeDto);
        Employee savedEmployee =  employeeRepository.save(employee);
        return EmployeeMapper.maptoEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Employee with id " + id + " not found"));
        return EmployeeMapper.maptoEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployee() {
        List<Employee> employees = employeeRepository.findAll();
//        List<EmployeeDto> employeeDtos = new ArrayList<>();
//        for (Employee employee : employees) {
//            employeeDtos.add(EmployeeMapper.maptoEmployeeDto(employee));
//        }
//        return employeeDtos;

        return  employees.stream().map(EmployeeMapper::maptoEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto employeeDto) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee with id " + employeeId + " not found"));

        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.maptoEmployeeDto(savedEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}

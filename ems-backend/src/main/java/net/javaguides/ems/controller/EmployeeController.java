package net.javaguides.ems.controller;

import net.javaguides.ems.dto.EmployeeDto;
import net.javaguides.ems.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    //Build add Employee REST API
    @PostMapping()
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto) {
       EmployeeDto savedEmployee =  employeeService.createEmployee(employeeDto);
       return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    //Build Get employee REST API
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long id) {
        EmployeeDto employeeDto = employeeService.getEmployeeById(id);
        return new ResponseEntity<>(employeeDto, HttpStatus.OK);
    }

    //Build getAll employee REST API
    @GetMapping()
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        List<EmployeeDto> allEmployees= employeeService.getAllEmployee();
        return new ResponseEntity<>(allEmployees,HttpStatus.OK);
    }

    //Build updateEmployee REST API
    @PostMapping("/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long id, @RequestBody EmployeeDto employeeDto) {
        EmployeeDto updatedEmployee = employeeService.updateEmployee(id, employeeDto);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>("Employee deleted successfully", HttpStatus.OK);
    }
}

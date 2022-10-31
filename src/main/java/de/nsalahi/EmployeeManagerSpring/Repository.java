package de.nsalahi.EmployeeManagerSpring;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.Id;

@RestResource
public interface Repository extends CrudRepository<Employee, Long> {
}

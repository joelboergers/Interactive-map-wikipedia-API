package de.nsalahi.EmployeeManagerSpring;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    private String last_name;
    private String first_name;
    private String city_residence;

    /*public Employee(long id, String first_name, String last_name, String city_residence) {
        this.id = id;
        this.last_name = last_name;
        this.first_name = first_name;
        this.city_residence = city_residence;
    }

    public Employee(long id, String first_name, String last_name) {
        this.id = id;
        this.last_name = last_name;
        this.first_name = first_name;
    }

    public Employee(String first_name, String last_name) {
        this.last_name = last_name;
        this.first_name = first_name;
    }*/

    public Long getId() {
        return id;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getCity_residence() {
        return city_residence;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public void setCity_residence(String city_residence) {
        this.city_residence = city_residence;
    }

    @Override
    public String toString() {
        String resultString =  "{" + "\""+"id" + "\"" + ":"  + this.id  + "," +
                "\"" +"first_name" + "\""  + ":" + "\"" + this.first_name + "\"" + "," +
                "\"" +"last_name" + "\""  + ":" + "\"" + this.last_name + "\""+ "," +
                "\"" +"city_residence" + "\""  + ":" + "\"" + this.city_residence + "\"" + "}";

        return resultString;
    }

}
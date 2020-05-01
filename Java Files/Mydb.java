package com.ngcusdirlogin;

import java.sql.Connection;
import java.sql.DriverManager;

public class Mydb {
	  Connection con;
	  
	  public Connection getCon(){
	    
	    try {
	      Class.forName("com.mysql.jdbc.Driver");
	      con = DriverManager.getConnection("jdbc:mysql://localhost:3306/report", "root", "password");
	    } catch (Exception e) {
	      System.out.println(e);
	    }
	    return con;
	  }
}

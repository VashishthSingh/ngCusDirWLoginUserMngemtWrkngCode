package com.ngcusdirlogin;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class HelperClass {
	
	public static Connection getConnection() {
		Connection con=null;
		try{  
			Class.forName("com.mysql.jdbc.Driver");  
			con=DriverManager.getConnection("jdbc:mysql://localhost:3306/report?useSSL=false","root","password");     
		}catch(Exception e){ 
				System.out.println(e);
		}  
		return(con);
	}
	
	public static boolean getTrueOrFalse() {
		boolean flag=false;
		try{  
			Connection con=HelperClass.getConnection();
			Statement stmt=con.createStatement();  
			ResultSet rs=stmt.executeQuery("select * from startStop");  
			rs.next();
			if(rs.getInt(1)==1) {
				flag=true;
			}
			con.close();
			stmt.close();
			rs.close();
		}catch(Exception e){ 
			System.out.println(e);
		}  
		return(flag);
	}
	
	public static void setToOne(){
		Connection con=HelperClass.getConnection();
		try{  
			PreparedStatement ps=con.prepareStatement("update startStop set flag=?");
			ps.setInt(1,1);
			ps.executeUpdate();
			con.close();
			ps.close();
		}catch(Exception e){ 
			System.out.println(e);
		} 
	}
	
	public static void setToZero(){
		Connection con=HelperClass.getConnection();
		try{  
			PreparedStatement ps=con.prepareStatement("update startStop set flag=?");
			ps.setInt(1,0);
			ps.executeUpdate();
			con.close();
			ps.close();
		}catch(Exception e){ 
			System.out.println(e);
		} 
	}
	
}

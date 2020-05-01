package com.ngcusdirlogin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/AddUserServlet")
public class AddUserServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    public AddUserServlet() {super();}
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String userName=request.getParameter("userName");
		String password=request.getParameter("passWord");
		System.out.println(userName+" "+password);
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
        Mydb db = new Mydb();
        Connection con = db.getCon();
        try {
        	PreparedStatement ps=con.prepareStatement("select * from loginCredential where username=? and password=?");  
            ps.setString(1,userName);
            ps.setString(2,password);
        	ResultSet rs = ps.executeQuery();
            if(rs.next()==true) {
            	out.println("This User Already Exist");
            	ps.close();
            	rs.close();
            	con.close();
            }
            else {
            	ps.close();
            	rs.close();
            	con.close();
            	
            	Connection con1 = db.getCon();
            	PreparedStatement ps1=con1.prepareStatement("insert into loginCredential values(?,?)");  
                ps1.setString(1,userName);
                ps1.setString(2,password);
            	ps1.executeUpdate();
            	ps1.close();
            	out.println("User Added Successfully");
            }
         }catch (Exception ex) {
             System.out.println(ex);
         }
        
	}
}

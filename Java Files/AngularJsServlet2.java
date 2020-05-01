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

@WebServlet("/AngularJsServlet2")
public class AngularJsServlet2 extends HttpServlet {
	private static final long serialVersionUID = 1L;
    public AngularJsServlet2() {super();}
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String isFound="{\"found\":\"yes\"}";
		String notFound="{\"found\":\"no\"}";
		
		String userName=request.getParameter("userName");
		String password=request.getParameter("passWord");

		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
        Mydb db = new Mydb();
        Connection con = db.getCon();
        try {
        	PreparedStatement ps=con.prepareStatement("select * from loginCredential where username=? and password=?");  
            ps.setString(1,userName);
            ps.setString(2,password);
        	ResultSet rs = ps.executeQuery();
            if(rs.next()==true) {
            	out.println(isFound);
            }
            else {
            	out.println(notFound);
            }
         }catch (Exception ex) {
             System.out.println(ex);
         }
	}

}

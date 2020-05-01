package com.ngcusdirlogin;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;

import com.google.gson.Gson;

@WebServlet("/AngularJsServlet1")
public class AngularJsServlet1 extends HttpServlet {
	private static final long serialVersionUID = 1L;
    public AngularJsServlet1() {super();}
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String startDT=request.getParameter("startRange");
		String endDT=request.getParameter("endRange");

		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
        Mydb db = new Mydb();
        Connection con = db.getCon();
        ArrayList<User> al = new ArrayList<>();
        try {
        	PreparedStatement ps=con.prepareStatement("select * from storePercentData where redDateTime>=? and redDateTime<=?");  
            ps.setString(1,startDT);
            ps.setString(2,endDT);
        	ResultSet rs = ps.executeQuery();
             
            while (rs.next()) {
                User userobj = new User(rs.getFloat("ramUti"), rs.getFloat("diskUti"), rs.getDouble("cpuUti"),rs.getString("redDateTime"));
                al.add(userobj);
            }
           JSONArray  arrayObj = new JSONArray(al);
           String json = new Gson().toJson(arrayObj);
           out.println(json);
         }catch (Exception ex) {
             System.out.println(ex);
         }
	}
}

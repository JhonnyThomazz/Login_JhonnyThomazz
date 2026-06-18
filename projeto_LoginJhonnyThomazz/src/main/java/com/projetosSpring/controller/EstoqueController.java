package com.projetosSpring.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.projetosSpring.entity.Estoque;
import com.projetosSpring.service.EstoqueService;

@RestController
@RequestMapping("/estoque")
public class EstoqueController {

final private EstoqueService estoqueService;
	
	public EstoqueController(EstoqueService estoqueService) {
		this.estoqueService = estoqueService;
	}
	
	@GetMapping ("/{id}")
	public ResponseEntity <Estoque> GetEstoqueById(@PathVariable Long id){
		Estoque estoque = estoqueService.GetEstoqueById(id);
		if (estoque != null) {
			return ResponseEntity.ok(estoque);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping ("/")
	public ResponseEntity <List<Estoque>> GetAllEstoque(){
		List <Estoque> estoque = estoqueService.GetAllEstoque();
		return ResponseEntity.ok(estoque);
	}
	
	@PostMapping ("/")
	public ResponseEntity <Estoque> SaveEstoque(@RequestBody Estoque estoque){
		Estoque saveEstoque = estoqueService.SaveEstoque(estoque);
		return ResponseEntity.status(HttpStatus.CREATED).body(saveEstoque);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity <Estoque> UpdateEstoque(@PathVariable Long id, @RequestBody Estoque estoque){
		Estoque updateEstoque = estoqueService.UpdateEstoque(id, estoque);
		if(updateEstoque != null) {
			return ResponseEntity.ok(updateEstoque);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity <Estoque> DeleteEstoque(@PathVariable Long id){
		boolean deleteEstoque = estoqueService.DeleteEstoque(id);
		if(deleteEstoque) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
}


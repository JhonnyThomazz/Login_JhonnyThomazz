package com.projetosSpring.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import com.projetosSpring.entity.Estoque;
import com.projetosSpring.repository.EstoqueRepository;

@Service
public class EstoqueService {

	final private EstoqueRepository estoqueRepository;
	
	public EstoqueService (EstoqueRepository estoqueRepository) {
		this.estoqueRepository = estoqueRepository;
	}
	
	public Estoque GetEstoqueById(Long id) {
		return estoqueRepository.findById(id).orElse(null);
	}
	
	public List<Estoque> GetAllEstoque(){
		return estoqueRepository.findAll();
	}
	
	public Estoque SaveEstoque(Estoque estoque) {
		return estoqueRepository.save(estoque);
	}
	
	public Estoque UpdateEstoque(Long id, Estoque estoque) {
		Optional<Estoque> estoqueExists = estoqueRepository.findById(id);
		if(estoqueExists.isPresent()) {
			Estoque UpdateEstoque = estoqueExists.get();
			BeanUtils.copyProperties(estoque, UpdateEstoque, "id");
			return estoqueRepository.save(UpdateEstoque);
		}
		return null;
	}
	
	public Boolean DeleteEstoque(Long id) {
		Optional <Estoque> estoqueExists = estoqueRepository.findById(id);
		if(estoqueExists.isPresent()) {
			estoqueRepository.deleteById(id);
			return true;
		}
		else {
			return false;
		}
	}
}

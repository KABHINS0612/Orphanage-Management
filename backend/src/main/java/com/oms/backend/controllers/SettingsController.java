package com.oms.backend.controllers;

import com.oms.backend.entities.Settings;
import com.oms.backend.repositories.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class SettingsController {

    @Autowired
    private SettingsRepository repository;

    private static final String SETTINGS_ID = "singleton";

    @GetMapping
    public Settings getSettings() {
        return repository.findById(SETTINGS_ID).orElseGet(() -> {
            Settings defaultSettings = new Settings();
            defaultSettings.setId(SETTINGS_ID);
            defaultSettings.setOrphanageName("Hope Orphanage");
            return defaultSettings;
        });
    }

    @PutMapping
    public Settings updateSettings(@RequestBody Settings updatedSettings) {
        updatedSettings.setId(SETTINGS_ID);
        return repository.save(updatedSettings);
    }
}

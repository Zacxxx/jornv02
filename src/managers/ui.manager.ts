import {
  MENU,
  PLAYER_STATE,
  SCENE_STATE,
  PLAYER_TOOLS,
  MAPS,
} from "../models";
import { audioManager } from "./audio.manager";
import { dataManager } from "./data.manager";
import { gameManager } from "./game.manager";
import { hudManager } from "./hud.manager.tsx";
import { characterWindowManager } from "./character-window.manager";
import {
  TEXT_IN_GAME,
  TEXT_MAIN_MENU,
  TEXT_VIEWS,
  textManager,
} from "./text.manager";

class UIManager {
  game_container: any;
  game_slots_container: any;
  main_menu_buttons: any;
  btn_play: any;
  btn_continue: any;
  //
  tools_container: any;
  dialog_container: any;
  //
  menu_items_container: any;
  menu_window: any;
  menu_icon: any;
  menu_ingame: any;
  menu_opened = false;
  menu_close_btn: any;
  current_menu_item = -1;
  //
  character_panel_icon: any;
  character_panel: any;
  character_panel_opened = false;
  character_panel_close_btn: any;
  character_window_opened = false;
  menu_items = [
    // {
    //   name: TEXT_IN_GAME.MENU_COLLECTABLES,
    //   value: MENU.COLLECTIVES,
    // },
    {
      name: TEXT_IN_GAME.MENU_ITEMS,
      value: MENU.ITEMS,
    },
    {
      name: TEXT_IN_GAME.MENU_MAPS,
      value: MENU.MAP,
    },
    {
      name: TEXT_IN_GAME.MENU_SETTINGS,
      value: MENU.SETTINGS,
    },
    {
      name: TEXT_IN_GAME.MENU_EXIT,
      value: MENU.BACK_MAIN_MENU,
    },
    // {
    //   name: "Exit",
    //   value: MENU.EXIT,
    // },
  ];

  setting_music_buttons: any;
  init() {
    // templates
    this.create_template_main_menu();
    this.create_template_playing();
    this.create_template_dialog();
    this.create_template_menu_in_game();
    // linker
    this.link_template_references();
    // inits
    this.init_main_menu();
    this.init_menu();
    this.init_character_panel();
    this.init_settings();
    // Initialize HUD
    this.init_hud();
    // Initialize Character Window
    this.init_character_window();
    // Initialize dynamic scaling
    this.initDynamicScaling();
  }

  private calculateUIScale(): number {
    const gameContainer = document.getElementById('game');
    if (!gameContainer) return 1.2; // Default larger scale
    
    const containerWidth = gameContainer.clientWidth;
    const containerHeight = gameContainer.clientHeight;
    
    // Enhanced base scale calculation
    const baseWidth = 1920;
    const baseHeight = 1080;
    
    const scaleX = containerWidth / baseWidth;
    const scaleY = containerHeight / baseHeight;
    
    // Use average scale with bias toward larger screens
    const scale = (scaleX + scaleY) / 2;
    
    // Enhanced clamping with better range
    return Math.max(0.8, Math.min(3.0, scale * 1.2));
  }

  private applyUIScale() {
    const scale = this.calculateUIScale();
    const root = document.documentElement;
    root.style.setProperty('--ui-scale', scale.toString());
  }

  private initDynamicScaling() {
    // Apply initial scaling
    this.applyUIScale();
    
    // Enhanced resize handling with debouncing
    let resizeTimeout: number | null = null;
    let isResizing = false;
    
    const handleResize = () => {
      if (!isResizing) {
        isResizing = true;
        requestAnimationFrame(() => {
          this.applyUIScale();
          isResizing = false;
        });
      }
    };
    
    // Update scaling on window resize with debouncing
    window.addEventListener('resize', () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      
      resizeTimeout = window.setTimeout(handleResize, 100);
    });
  }

  // Initialize HUD
  private init_hud() {
    console.log('UI Manager: Initializing HUD');
    
    // Ensure CSS variables are set first
    this.applyUIScale();
    
    // Multiple initialization strategies for robustness
    const initializeHUD = () => {
      console.log('UI Manager: Starting HUD initialization');
      
      // Ensure the HUD container exists
      const hudContainer = document.getElementById('hud-container');
      if (!hudContainer) {
        console.warn('UI Manager: HUD container not found, will be created by HUD manager');
      } else {
        console.log('UI Manager: HUD container found, proceeding with initialization');
      }
      
      // Initialize HUD manager
      hudManager.init();
      
      // Add a delayed verification
      setTimeout(() => {
        if (!hudManager.isHUDVisible()) {
          console.warn('UI Manager: HUD not visible after initialization, attempting recovery');
          hudManager.showHUD();
        }
      }, 1000);
    };

    // Ensure DOM is ready before initializing HUD
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        console.log('UI Manager: DOM ready, initializing HUD');
        // Add a small delay to ensure all elements are rendered
        setTimeout(initializeHUD, 100);
      });
    } else {
      console.log('UI Manager: DOM already ready, initializing HUD immediately');
      // Use requestAnimationFrame to ensure rendering is complete
      requestAnimationFrame(() => {
        setTimeout(initializeHUD, 50);
      });
    }
  }

  // Initialize Character Window
  private init_character_window() {
    characterWindowManager.init();
    characterWindowManager.setOnCloseCallback(() => {
      this.character_window_opened = false;
    });
  }

  // HUD management methods
  showHUD() {
    hudManager.showHUD();
  }

  hideHUD() {
    hudManager.hideHUD();
  }

  toggleHUD() {
    hudManager.toggleHUD();
  }

  // templates
  private create_template_main_menu() {
    const main_menu_container: any = document.getElementById("main_menu");
    main_menu_container.innerHTML = `
    <div class="main-menu-content">
      <div class="main-menu-header">
        <h1 class="game-title">Jorn</h1>
        <p class="game-subtitle">Farm Adventure</p>
      </div>

      <div class="main-menu-actions">
        <div class="primary-actions" id="buttons">
          <button class="btn_main_menu primary" id="btn_play">
            <span class="btn-text">Continue</span>
          </button>
        </div>
        
        <div class="auth-actions">
          <button class="btn_auth" id="btn_login">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10,17 15,12 10,7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            Login
          </button>
          <button class="btn_auth" id="btn_register">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Register
          </button>
          <button class="btn_auth secondary" id="btn_forgot">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
            </svg>
            Forgot Password
          </button>
        </div>

        <div class="settings-section" id="settings"></div>
      </div>
    </div>

    <div id="game_slots" class="slots-side-panel">
      <div class="slot_header">
        <h2>${textManager.text(
          TEXT_VIEWS.MAIN_MENU,
          TEXT_MAIN_MENU.SLOTS_TITLE
        )}</h2>
        <button class="close-slots">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="slots"></div>
    </div>
    `;

    const settingsContainer = main_menu_container.querySelector("#settings");
    settingsContainer.appendChild(this.create_template_settings("main_menu"));
  }
  private create_template_settings(id_prefix: string) {
    const settings_div: any = document.createElement("div");
    settings_div.id = `${id_prefix}_settings`;
    settings_div.classList.add("modern-settings");
    settings_div.innerHTML = `
    <div class="setting-item">
      <div class="setting-info">
        <span class="setting-label">${textManager.text(
          TEXT_VIEWS.MAIN_MENU,
          TEXT_MAIN_MENU.SETTINGS_MUSIC
        )}</span>
        <span class="setting-description">Toggle background music</span>
      </div>
      <button class="modern-toggle btn_toggle_music">
        <div class="toggle-slider"></div>
      </button>
    </div>
    `;
    return settings_div;
  }
  private create_template_playing() {
    const playing_container: any = document.getElementById("playing");
    playing_container.innerHTML = `
        <div class="header"></div>
        <div id="character_panel_icon" class="character_panel_icon">
            <svg class="character-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
         </div>
        <div id="menu_icon" class="menu_icon">
            <span class="menu-icon">⚙</span>
         </div>
        <div id="character_panel" class="character_panel">
          <div class="panel_header">
            <span class="panel_title">CHARACTER</span>
            <div class="panel_close">✕</div>
          </div>
          <div class="panel_grid">
            <div class="panel_item character">
              <div class="panel_icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <span class="panel_label">Character</span>
            </div>
            <div class="panel_item crafting">
              <div class="panel_icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m9 12 2 2 4-4"/>
                  <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"/>
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
                </svg>
              </div>
              <span class="panel_label">Crafting</span>
            </div>
            <div class="panel_item inventory">
              <div class="panel_icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 7c1-1 3-1 5-1s4 0 5 1v12H5V7Z"/>
                  <path d="M12 6V2"/>
                  <path d="M8 6V4"/>
                  <path d="M16 6V4"/>
                </svg>
              </div>
              <span class="panel_label">Inventory</span>
            </div>
            <div class="panel_item spells">
              <div class="panel_icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/>
                  <path d="m14 7 3 3"/>
                  <path d="M5 6v4"/>
                  <path d="M19 14v4"/>
                  <path d="M10 2v2"/>
                  <path d="M7 8H3"/>
                  <path d="M21 16h-4"/>
                  <path d="M11 3H9"/>
                </svg>
              </div>
              <span class="panel_label">Spells</span>
            </div>
            <div class="panel_item traits">
              <div class="panel_icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
              </div>
              <span class="panel_label">Traits</span>
            </div>
            <div class="panel_item abilities">
              <div class="panel_icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="m2 17 10 5 10-5"/>
                  <path d="m2 12 10 5 10-5"/>
                </svg>
              </div>
              <span class="panel_label">Abilities</span>
            </div>
            <div class="panel_item quests">
              <div class="panel_icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>
              <span class="panel_label">Quests</span>
            </div>
            <div class="panel_item encyclopedia">
              <div class="panel_icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                  <circle cx="12" cy="8" r="2"/>
                  <path d="M12 10v4h4"/>
                </svg>
              </div>
              <span class="panel_label">Encyclopedia</span>
            </div>
          </div>
        </div>
        <div id="tools_container" class="tools" style="display: none"></div>
        <div id="hud-container"></div>
    `;
  }
  private create_template_dialog() {
    const dialog_container: any = document.getElementById("dialog_container");
    dialog_container.innerHTML = `
    <div class="avatar"></div>
        <div class="content">
        <div class="text"></div>
    </div>
    `;
  }
  private create_template_menu_in_game() {
    const menu_in_game: any = document.getElementById("menu_in_game");
    menu_in_game.innerHTML = `
    <div id="menu_ingame" class="menu">
    <div class="menu_header">
      <p>${textManager.text(TEXT_VIEWS.IN_GAME, TEXT_IN_GAME.MENU)}</p>
      <div class="menu_close">▲</div>
    </div>
    <ul id="menu_items_container"></ul>
  </div>
  <div id="menu_window" class="submenu">
    <div class="menu_header"></div>
    <div class="menu_content">
      <div class="collectives"></div>
      <div class="items"></div>
      <div class="map"></div>
      <div id="settings_container"></div>
    </div>
    <div class="menu_footer"></div>
  </div>
    `;

    const settings_container = menu_in_game.querySelector(
      "#settings_container"
    );
    settings_container.appendChild(this.create_template_settings("in_game"));
  }

  // link template
  private link_template_references() {
    this.game_container = document.getElementById("game");
    this.game_slots_container = document.getElementById("game_slots");
    //
    this.main_menu_buttons = document.getElementById("buttons");
    this.btn_play = document.getElementById("btn_play");
    this.btn_continue = document.getElementById("btn_continue");
    //
    this.setting_music_buttons = document.querySelectorAll(".modern-toggle");
    //

    this.menu_items_container = document.getElementById("menu_items_container");
    this.menu_ingame = document.getElementById("menu_ingame");
    this.menu_window = document.getElementById("menu_window");
    this.menu_icon = document.getElementById("menu_icon");
    this.menu_close_btn = document.querySelectorAll(".menu_close");
    //
    this.character_panel_icon = document.getElementById("character_panel_icon");
    this.character_panel = document.getElementById("character_panel");
    this.character_panel_close_btn = document.querySelector(".panel_close");
    //
    this.tools_container = document.getElementById("tools_container");
    this.dialog_container = document.getElementById("dialog_container");
  }
  // inits
  update_state(state: SCENE_STATE) {
    this.game_container.className = state;
    
    // Show HUD only when playing
    if (state === SCENE_STATE.PLAYING) {
      this.showHUD();
    } else {
      this.hideHUD();
    }
    
    // Update UI scaling when state changes
    requestAnimationFrame(() => {
      this.applyUIScale();
    });
  }

  private init_menu() {
    //
    const menu_header = this.menu_ingame.querySelector(".menu_header");
    menu_header.onclick = () => {
      this.close_menu();
    };
    this.menu_icon.onclick = () => {
      gameManager.scene_state.next(SCENE_STATE.MENU);
    };
    this.menu_close_btn.forEach((btn: any) => {
      btn.onclick = () => {
        this.cancel_menu();
      };
    });

    this.update_menu();
  }

  private init_character_panel() {
    // Character panel button click
    if (this.character_panel_icon) {
      this.character_panel_icon.onclick = () => {
        this.toggle_character_panel();
      };
    }

    // Character panel close button
    if (this.character_panel_close_btn) {
      this.character_panel_close_btn.onclick = () => {
        this.close_character_panel();
      };
    }

    // Panel item clicks
    if (this.character_panel) {
      const panel_items = this.character_panel.querySelectorAll('.panel_item');
      panel_items.forEach((item: any) => {
        item.onclick = () => {
          const itemType = item.classList[1]; // Get the second class (character, crafting, etc.)
          this.handle_character_panel_item(itemType);
        };
      });
    }
  }
  init_main_menu() {
    this.hide_slots();
    this.btn_play.onclick = () => this.show_slots();
    this.update_btn_play();
    
    // Initialize auth buttons (placeholder functionality)
    this.init_auth_buttons();
    
    // Ensure slots panel is hidden initially
    if (this.game_slots_container) {
      this.game_slots_container.classList.remove("show");
    }
  }
  
  private init_auth_buttons() {
    const btnLogin = document.getElementById('btn_login');
    const btnRegister = document.getElementById('btn_register');
    const btnForgot = document.getElementById('btn_forgot');
    
    if (btnLogin) {
      btnLogin.onclick = () => {
        console.log('🔐 Login clicked - Placeholder functionality');
        // TODO: Implement login modal/screen
        alert('Login functionality coming soon!');
      };
    }
    
    if (btnRegister) {
      btnRegister.onclick = () => {
        console.log('📝 Register clicked - Placeholder functionality');
        // TODO: Implement registration modal/screen
        alert('Registration functionality coming soon!');
      };
    }
    
    if (btnForgot) {
      btnForgot.onclick = () => {
        console.log('🔑 Forgot Password clicked - Placeholder functionality');
        // TODO: Implement forgot password modal/screen
        alert('Password recovery functionality coming soon!');
      };
    }
  }
  private update_btn_play() {
    const slots = dataManager.data.slots.filter((s: any) => Boolean(s.data));
    const have_slots = slots.length > 0;
    const btnText = this.btn_play.querySelector('.btn-text');

    if (have_slots) {
      if (btnText) {
        btnText.textContent = textManager.text(
          TEXT_VIEWS.MAIN_MENU,
          TEXT_MAIN_MENU.BTN_CONTINUE
        );
      }
    } else {
      if (btnText) {
        btnText.textContent = textManager.text(
          TEXT_VIEWS.MAIN_MENU,
          TEXT_MAIN_MENU.BTN_NEW_GAME
        );
      }
    }
  }
  private create_slots() {
    const slots_container = this.game_slots_container.querySelector(".slots");
    slots_container.innerHTML = "";
    dataManager.data.slots.forEach((slot: any, i: number) => {
      const slot_div = document.createElement("div");
      slot_div.classList.add("slot");
      slot_div.classList.add("empty");

      let slot_detail = textManager.text(
        TEXT_VIEWS.MAIN_MENU,
        TEXT_MAIN_MENU.SLOTS_EMPTY
      );
      if (slot.data) {
        slot_detail = this.format_slot_date(slot.data.ts);
        slot_div.classList.remove("empty");
        slot_div.innerHTML = `
        <div class="slot-info">
          <h3 class="slot-title">${textManager.text(
            TEXT_VIEWS.MAIN_MENU,
            TEXT_MAIN_MENU.SLOTS_NAME
          )} #${i + 1}</h3>
          <p class="date">${slot_detail}</p>
        </div>
        <div class="actions">
            <button class="btn_action" id="action_play">${textManager.text(
              TEXT_VIEWS.MAIN_MENU,
              TEXT_MAIN_MENU.SLOTS_BTN_PLAY
            )}</button>
            <button class="btn_action" id="action_delete">${textManager.text(
              TEXT_VIEWS.MAIN_MENU,
              TEXT_MAIN_MENU.SLOTS_BTN_DELETE
            )}</button>
        </div>
       `;
        const action_play: any = slot_div.querySelector("#action_play");
        const action_delete: any = slot_div.querySelector("#action_delete");

        action_play!.onclick = () => {
          gameManager.start_game(slot.id);
          this.hide_slots();
        };
        action_delete!.onclick = () => {
          dataManager.delete_slot(slot.id);
          this.create_slots();
        };
      } else {
        slot_div.innerHTML = `
        <div class="slot-info">
          <h3 class="slot-title">${textManager.text(
            TEXT_VIEWS.MAIN_MENU,
            TEXT_MAIN_MENU.SLOTS_NAME
          )} #${i + 1}</h3>
          <p class="date">${slot_detail}</p>
        </div>
        <div class="empty-slot-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <span>Click to create new save</span>
        </div>
       `;
        slot_div!.onclick = () => {
          gameManager.start_game(slot.id);
          this.hide_slots();
        };
      }
      slots_container.appendChild(slot_div);
    });

    const close_slots = this.game_slots_container.querySelector(".close-slots");
    close_slots.onclick = () => this.hide_slots();
  }
  private show_slots() {
    this.create_slots();
    this.game_slots_container.classList.add("show");
  }
  private hide_slots() {
    this.update_btn_play();
    this.game_slots_container.classList.remove("show");
  }
  private format_slot_date(ts: number) {
    const d = new Date(ts).toUTCString();
    const [_weekday, day, month, _year, time, _gmt] = d.split(" ");

    return `${month} ${day} ${time}`;
  }
  private init_settings() {
    this.setting_music_buttons.forEach((btn: any) => {
      // Set initial state
      if (!dataManager.data.preferences.mute) {
        btn.classList.add("active");
      }
      btn.onclick = () => {
        audioManager.toggleMute();
        this.update_settings();
      };
    });
  }

  update_settings() {
    this.setting_music_buttons.forEach((btn: any) => {
      if (dataManager.data.preferences.mute) {
        btn.classList.remove("active");
      } else {
        btn.classList.add("active");
      }
    });
  }
  // tools
  update_tools(active = "") {
    this.tools_container.innerHTML = "";
    PLAYER_TOOLS.forEach((tool) => {
      const div = document.createElement("div");
      div.classList.add("tool");
      div.innerHTML = `
        <div class="${tool}"></div>
      `;
      if (tool === active) {
        div.classList.add("active");
      }
      this.tools_container.appendChild(div);
    });
  }
  // dialogues
  display_dialog(
    _actor: "player" | "npc" = "player",
    text: string,
    last = false
  ) {
    const text_container = this.dialog_container.querySelector(".text");
    text_container.classList.remove("last");

    text_container.innerText = text;
    if (last) {
      text_container.classList.add("last");
    }
  }
  // menu
  update_menu() {
    this.menu_items_container.innerHTML = "";
    this.menu_items.forEach((item, i) => {
      const btn = document.createElement("button");
      btn.classList.add("menu_item");
      btn.name = i.toString();

      btn.innerText = textManager.text(TEXT_VIEWS.IN_GAME, item.name);
      if (i === this.current_menu_item) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
      btn.onclick = () => {
        this.current_menu_item = Number(btn.name);
        this.update_menu();
        this.open_submenu();
      };

      this.menu_items_container.appendChild(btn);
    });
  }
  open_submenu() {
    const current = this.menu_items[this.current_menu_item];
    if (current.value === MENU.EXIT) {
      this.cancel_menu();
      return;
    } else if (current.value === MENU.BACK_MAIN_MENU) {
      this.current_menu_item = 0;
      this.cancel_menu();
      gameManager.go_to(MAPS.MAIN_MENU);
      return;
    }

    this.menu_window.classList = current.value;
    const menu_header = this.menu_window.querySelector(".menu_header");
    menu_header.innerText = textManager.text(TEXT_VIEWS.IN_GAME, current.name);
    const closeDiv = document.createElement("div");
    closeDiv.innerText = "x";
    closeDiv.classList.add("menu_close");
    closeDiv.onclick = () => this.cancel_menu();

    menu_header.appendChild(closeDiv);
    this.menu_window.style.display = "block";
    this.menu_opened = true;
  }
  close_menu() {
    this.close_submenu();
    gameManager.player.set_state(PLAYER_STATE.IDLE);
    gameManager.scene_state.next(SCENE_STATE.PLAYING);
    this.current_menu_item = -1;
  }
  cancel_menu() {
    if (this.menu_opened) {
      this.close_submenu();
    } else {
      this.close_menu();
    }
    this.update_menu();
  }
  close_submenu() {
    this.menu_window.style.display = "none";
    this.menu_opened = false;
    this.current_menu_item = -1;
  }
  menu_item_down() {
    this.current_menu_item++;
    if (this.current_menu_item > this.menu_items.length - 1) {
      this.current_menu_item = 0;
    }

    this.update_menu();
  }
  menu_item_up() {
    this.current_menu_item--;
    if (this.current_menu_item < 0) {
      this.current_menu_item = this.menu_items.length - 1;
    }
    this.update_menu();
  }

  // Character panel methods
  toggle_character_panel() {
    if (this.character_panel_opened) {
      this.close_character_panel();
    } else {
      this.open_character_panel();
    }
  }

  open_character_panel() {
    if (this.character_panel) {
      this.character_panel.style.display = "block";
      this.character_panel_opened = true;
    }
  }

  close_character_panel() {
    if (this.character_panel) {
      this.character_panel.style.display = "none";
      this.character_panel_opened = false;
    }
  }

  handle_character_panel_item(itemType: string) {
    // Open character window with the selected tab
    this.open_character_window(itemType);
    
    // Close the character panel after selection
    this.close_character_panel();
  }

  // Character window methods
  open_character_window(tabId: string = 'character') {
    this.character_window_opened = true;
    characterWindowManager.open(tabId);
  }

  close_character_window() {
    this.character_window_opened = false;
    characterWindowManager.close();
  }

  toggle_character_window(tabId: string = 'character') {
    if (this.character_window_opened) {
      this.close_character_window();
    } else {
      this.open_character_window(tabId);
    }
  }

  // Debug and utility methods
  getCurrentUIScale(): number {
    return this.calculateUIScale();
  }

  forceUIScaleUpdate() {
    this.applyUIScale();
  }

  // Viewport change handler for coordination with game manager
  onViewportChange(viewportInfo: any) {
    console.log('UI Manager: Received viewport change:', viewportInfo);
    
    // Update UI scaling based on new viewport
    const root = document.documentElement;
    root.style.setProperty('--ui-scale', viewportInfo.scale.toString());
    
    // Force HUD to update its positioning
    if (typeof hudManager.showHUD === 'function') {
      // Trigger a re-render of the HUD
      setTimeout(() => {
        hudManager.hideHUD();
        setTimeout(() => {
          hudManager.showHUD();
        }, 50);
      }, 100);
    }
    
    console.log('UI Manager: Viewport change handling completed');
  }
}

export const uiManager = new UIManager();

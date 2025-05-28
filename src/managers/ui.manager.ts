import {
  MENU,
  PLAYER_STATE,
  SCENE_STATE,
  PLAYER_TOOLS,
  MAPS,
  LANGUAGES,
} from "../models";
import { audioManager } from "./audio.manager";
import { dataManager } from "./data.manager";
import { gameManager } from "./game.manager";
import { hudManager } from "./hud.manager";
import { characterWindowManager } from "./character-window.manager";
import {
  TEXT_CONTROLS,
  TEXT_CREDITS,
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
  }

  // Initialize HUD
  private init_hud() {
    hudManager.init();
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
    <div id="game_slots">
      <div class="slot_header">
        <h2>${textManager.text(
          TEXT_VIEWS.MAIN_MENU,
          TEXT_MAIN_MENU.SLOTS_TITLE
        )}</h2>
        <div class="close-slots">x</div>
      </div>
      <div class="slots"></div>
    </div>

    <div class="buttons" id="buttons">
      <button class="btn_main_menu" id="btn_play"></button>
    </div>
    <div class="settings" id="settings"></div>
    `;

    main_menu_container.appendChild(this.create_template_settings("main_menu"));
  }
  private create_template_settings(id_prefix: string) {
    const settings_div: any = document.createElement("div");
    settings_div.id = `${id_prefix}_settings`;
    settings_div.classList.add("settings");
    const current_lang = dataManager.data.preferences.lang;
    settings_div.innerHTML = `
    <div class="setting">
    <p>${textManager.text(
      TEXT_VIEWS.MAIN_MENU,
      TEXT_MAIN_MENU.SETTINGS_MUSIC
    )}</p>
    <button class="toggle btn_toggle_music"></button>
  </div>
   <div class="setting">
    <p>${textManager.text(
      TEXT_VIEWS.MAIN_MENU,
      TEXT_MAIN_MENU.SETTINGS_LANG
    )}</p>
    <button class="btn_lang ${
      current_lang === LANGUAGES.ENGLISH ? "active" : ""
    } " id="btn_lang_en">English</button>
    <button class="btn_lang ${
      current_lang === LANGUAGES.SPANISH ? "active" : ""
    } " id="btn_lang_es">Español</button>
  </div> 
    `;
    const btn_lang_en = settings_div.querySelector("#btn_lang_en");
    const btn_lang_es = settings_div.querySelector("#btn_lang_es");

    btn_lang_en.onclick = () => {
      if (dataManager.data.preferences.lang === LANGUAGES.ENGLISH) return;
      dataManager.set_language(LANGUAGES.ENGLISH);
      this.init();
    };
    btn_lang_es.onclick = () => {
      if (dataManager.data.preferences.lang === LANGUAGES.SPANISH) return;
      dataManager.set_language(LANGUAGES.SPANISH);
      this.init();
    };
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
    this.setting_music_buttons = document.querySelectorAll(".btn_toggle_music");
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
  }
  private update_btn_play() {
    const slots = dataManager.data.slots.filter((s: any) => Boolean(s.data));
    const have_slots = slots.length > 0;

    if (have_slots) {
      this.btn_play.innerText = textManager.text(
        TEXT_VIEWS.MAIN_MENU,
        TEXT_MAIN_MENU.BTN_CONTINUE
      );
    } else {
      this.btn_play.innerText = textManager.text(
        TEXT_VIEWS.MAIN_MENU,
        TEXT_MAIN_MENU.BTN_NEW_GAME
      );
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
        <p>${textManager.text(
          TEXT_VIEWS.MAIN_MENU,
          TEXT_MAIN_MENU.SLOTS_NAME
        )} #${i + 1}</p>
        <p class="date"><small>${slot_detail}</small></p>
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
        <p>${textManager.text(
          TEXT_VIEWS.MAIN_MENU,
          TEXT_MAIN_MENU.SLOTS_NAME
        )} #${i + 1}</p>
        <p class="date"><small>${slot_detail}</small></p>
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
    this.game_slots_container.style.display = "flex";
  }
  private hide_slots() {
    this.update_btn_play();
    this.game_slots_container.style.display = "none";
  }
  private format_slot_date(ts: number) {
    const d = new Date(ts).toUTCString();
    const [_weekday, day, month, _year, time, _gmt] = d.split(" ");

    return `${month} ${day} ${time}`;
  }
  private init_settings() {
    this.setting_music_buttons.forEach((btn: any) => {
      if (dataManager.data.preferences.mute) {
        btn.classList.add("off");
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
        btn.classList.add("off");
      } else {
        btn.classList.remove("off");
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
}

export const uiManager = new UIManager();
